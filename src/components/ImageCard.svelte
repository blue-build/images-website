<script lang="ts">
  import { onMount } from "svelte";
  import { getGithubRepository } from "@ts/apiHelpers";
  import { templateStr } from "@ts/templateStrings";
  import type { Image, ImageFilter } from "@ts/types";

  import Icon from "@iconify/svelte";
  import gitFork from "@iconify/icons-ph/git-fork-bold";
  import starRounded from "@iconify/icons-material-symbols/star-rounded";
  import RebaseCommand from "@components/RebaseCommand.svelte";
  import Box from "@components/Box.svelte";
  import IconList from "@components/IconList.svelte";

  export let image: Image;
  export let filter: ImageFilter;

  $: filteredEditions = image.editions.filter((e) => {
    if (filter.featureSet.length < 1 && filter.desktop.length < 1) return true;

    if (filter.desktop.length > 0) {
      return filter.desktop.every((d) => e.desktop === d);
    }
    return true;
  });

  let githubRepo: Object;

  onMount(async () => {
    githubRepo = await getGithubRepository(image.githubRepo).then(
      (data) => data
    );
  });
</script>

{#each filteredEditions as edition}
  <div class="flex flex-col border-4 border-solid border-indigo-800 p-4">
    <div class="flex flex-row items-center gap-2">
      <h2 class="mr-8 text-xl font-bold text-indigo-800">
        {templateStr(image.name, { edition: edition })}
      </h2>
      {#if githubRepo}
        <Box class="ml-auto px-2 py-[0.2rem]">
          <a href={githubRepo["html_url"]} class="flex items-center font-bold">
            <Icon icon={gitFork} />
            {githubRepo["forks_count"]}
          </a>
        </Box>
        <Box class="px-2 py-[0.2rem]">
          <a href={githubRepo["html_url"]} class="flex items-center font-bold">
            <Icon icon={starRounded} />
            {githubRepo["stargazers_count"]}
          </a>
        </Box>
      {/if}
    </div>
    <span>{image.creator}</span>
    <IconList {image} {edition} />
    <Box
      class="ml-2 mt-3 mb-4 max-w-xl outline-gray-100 hover:outline-gray-100"
    >
      {edition.description}
    </Box>
    <RebaseCommand {image} {edition} />
  </div>
{/each}
