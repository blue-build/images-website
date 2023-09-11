<script lang="ts">
  import Box from "@components/Box.svelte";
  import { customImage } from "@ts/stores";
  import type { CustomImage } from "@ts/types";
  import YAML from "yaml";

  let authorized = false;
  let custom: CustomImage;
  let forked: Promise<boolean>;
  let again = false;
  let useTemplate = false;

  let log = "";

  customImage.subscribe((c) => {
    authorized = c.auth != undefined;
    custom = c;
    if (custom.login) {
      forked = isForked();
    }
  });

  async function isForked() {
    const res = await fetch(
      `https://api.github.com/repos/ublue-os/startingpoint/forks`,
      {
        headers: { Authorization: `Bearer ${custom.auth}` },
      }
    );
    const forks = await res.json();
    // checks if the array containing all forks of startingpoint by custom.login is longer than 0
    return (
      forks.filter((f: { owner: { login: string } }) => {
        return f.owner.login == custom.login;
      }).length > 0
    );
  }

  async function createRepo() {
    log = "";
    try {
      let repo: { owner: { login: string }; name: string };
      if (useTemplate) {
        const res = await fetch(
          `https://api.github.com/repos/ublue-os/startingpoint/generate`,
          {
            method: "post",
            headers: { Authorization: `Bearer ${custom.auth}` },
            body: JSON.stringify({
              owner: custom.login,
              name: custom.name,
            }),
          }
        );
        repo = await res.json();
        if (res.status != 200) {
          log += "Repo creation failed: \n";
          log += JSON.stringify(repo);
          log += "\n";
        } else {
          log += "Repo created successfully! \n";
        }
      } else {
        const res = await fetch(
          `https://api.github.com/repos/ublue-os/startingpoint/forks`,
          {
            method: "post",
            headers: { Authorization: `Bearer ${custom.auth}` },
            body: JSON.stringify({
              name: custom.name,
              description:
                custom.description != undefined
                  ? custom.description
                  : "This is my personal OS image.",
            }),
          }
        );
        repo = await res.json();
        if (!res.ok) {
          log += "Repo creation failed: \n";
          log += JSON.stringify(repo);
          log += "\n";
          throw new Error();
        } else {
          log += "Repo created successfully! \n";
        }
      }

      customImage.update((c) => {
        return {
          ...c,
          repo: `${repo.owner.login}/${repo.name}`,
        };
      });

      // get sha of latest commit in `template`
      let templateBranchRes = await fetch(
        `https://api.github.com/repos/${custom.repo}/branches/template`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${custom.auth}` },
        }
      );
      // when creating a fork it might take a while for the branch to exist, so we retry every second
      while (templateBranchRes.status != 200) {
        log += "Getting info for branch 'template' failed, retrying...\n";
        await new Promise((r) => setTimeout(r, 1000));
        templateBranchRes = await fetch(
          `https://api.github.com/repos/${custom.repo}/branches/template`,
          {
            method: "get",
            headers: { Authorization: `Bearer ${custom.auth}` },
          }
        );
      }
      const templateBranch = await templateBranchRes.json();
      log += "Info for branch 'template' got succesfully! \n";

      // create branch called `live`
      const newBranchRes = await fetch(
        `https://api.github.com/repos/${custom.repo}/git/refs`,
        {
          method: "post",
          headers: { Authorization: `Bearer ${custom.auth}` },
          body: JSON.stringify({
            ref: "refs/heads/live",
            // this is a required parameter, the new branch is created from the sha
            sha: templateBranch.commit.sha,
          }),
        }
      );
      if (!newBranchRes.ok) {
        log += "Creating branch 'live' failed. \n";
        throw new Error();
      } else {
        log += "New branch 'live' created succesfully! \n";
      }

      // update the default branch to "live" and set the description
      const updateRes = await fetch(
        `https://api.github.com/repos/${custom.repo}`,
        {
          method: "post",
          headers: { Authorization: `Bearer ${custom.auth}` },
          body: JSON.stringify({
            default_branch: "live",
            description:
              custom.description != undefined
                ? custom.description
                : "This is my personal OS image.",
          }),
        }
      );
      if (!updateRes.ok) {
        log += "Updating repo information failed. \n";
        throw new Error();
      } else {
        log += "Updated repo information successfully! \n";
      }

      const readmeRes = await fetch(
        `https://api.github.com/repos/${custom.repo}/contents/README.md`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${custom.auth}` },
        }
      );
      const readmeJson = await readmeRes.json();
      if (!readmeRes.ok) {
        log += "Error getting README: \n";
        log += JSON.stringify(readmeJson);
        log += "\n";
      } else {
        log += "README got successfully! \n";
      }
      let readme = String(atob(readmeJson.content));
      readme = readme.replaceAll("ublue-os/startingpoint", custom.repo);
      const readmeLines = readme.split("\n");
      readmeLines[0] = `# ${custom.name}`;
      readme = readmeLines.join("\n");
      const readmeUpdateRes = await fetch(
        `https://api.github.com/repos/${custom.repo}/contents/README.md`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${custom.auth}` },
          body: JSON.stringify({
            message:
              "chore(automatic): replace all references to 'startingpoint'",
            content: btoa(readme),
            sha: readmeJson.sha,
          }),
        }
      );
      if (!readmeUpdateRes.ok) {
        log += "Error updating README. \n";
      } else {
        log += "README updated successfully! \n";
      }

      const recipeRes = await fetch(
        `https://api.github.com/repos/${custom.repo}/contents/config/recipe.yml`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${custom.auth}` },
        }
      );
      const recipeJson = await recipeRes.json();
      if (!recipeRes.ok) {
        log += "Error getting recipe: \n";
        log += JSON.stringify(recipeJson);
        log += "\n";
      } else {
        log += "Recipe got successfully! \n";
      }
      const recipe = String(atob(recipeJson.content));

      const recipeYml = YAML.parseDocument(recipe);
      recipeYml.contents.set("name", custom.name.toLowerCase());
      recipeYml.contents.set(
        "description",
        custom.description != undefined
          ? custom.description
          : "This is my personal OS image."
      );
      recipeYml.contents.set(
        "base-image",
        `ghcr.io/ublue-os/${custom.baseImage}`
      );

      const recipeUpdateRes = await fetch(
        `https://api.github.com/repos/${custom.repo}/contents/config/recipe.yml`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${custom.auth}` },
          body: JSON.stringify({
            message:
              "chore(automatic): update recipe to match user preferences",
            content: btoa(YAML.stringify(recipeYml)),
            sha: recipeJson.sha,
          }),
        }
      );
      if (!recipeUpdateRes.ok) {
        log += "Error updating recipe. \n";
      } else {
        log += "Recipe updated successfully! \n";
      }

      const workflowRes = await fetch(
        `https://api.github.com/repos/${custom.repo}/actions/permissions`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${custom.auth}` },
          body: JSON.stringify({
            enabled: true,
          }),
        }
      );
      const workflowRes2 = await fetch(
        `https://api.github.com/repos/${custom.repo}/actions/workflows/build.yml/enable`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${custom.auth}` },
        }
      );
      if (!workflowRes.ok || !workflowRes2.ok) {
        log += "Error enabling workflows. \n";
      } else {
        log += "Workflows enabled successfully! \n";
      }
      log += `Check https://github.com/${custom.repo}/actions and enable workflows manually if needed. \n`;

      log += "**** \n";
      log += "You repo has been initialized successfully! \n";
      log += `https://github.com/${custom.repo}`;
    } catch {
      log += "!!!! \n";
      log +=
        "Sorry, but repo creation cannot continue due to a fatal failure. \
Your new repo might have been left in a partially functional state, delete it to try again. \
You can report this to the sites issue tracker: https://github.com/ublue-os/images-website/issues. \
Remember to include logs, both from the console (enable XHR) and here.";
    }
  }
</script>

<div id="metadata" class="w-full max-w-4xl mx-auto p-8">
  <Box class="p-8 text-xl flex flex-col gap-8">
    {#if $customImage.repo != undefined && !again && log == ""}
      Repo already created! <br />
      {$customImage.repo}
      <button
        on:click={() => {
          again = true;
        }}><Box border class="p-4">Again!</Box></button
      >
    {:else if authorized}
      {#await forked then forked}
        {#if forked && !useTemplate && log == ""}
          It appears that you already have a fork of ublue-os/startingpoint. <br
          />
          Do you want to continue by creating a repository that is not a fork? (using
          the template)
          <button
            on:click={() => {
              useTemplate = true;
            }}
          >
            <Box border class="p-4">Continue</Box>
          </button>
        {:else if $customImage.name != undefined && $customImage.name != ""}
          <button on:click={createRepo}>
            <Box border class="p-4 w-fit">
              Create repo: {custom.login}/{custom.name}
            </Box>
          </button>
          {#if log}
            <pre
              class="whitespace-pre-wrap text-sm bg-fg-secondary text-bg-page dark:text-bg-secondary dark:bg-bg-page p-4">{log}</pre>
          {/if}
        {:else}
          You need to set a name for your image.
        {/if}
      {/await}
    {/if}
  </Box>
</div>
