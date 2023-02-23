<script lang="ts">
  import { onMount } from "svelte";
  import { getGithubRepository } from "@ts/apiHelpers";
  import { templateStr } from "@ts/templateStrings";
  import type { Image } from "@ts/types";

  import Icon from "@iconify/svelte";
  import starRounded from "@iconify/icons-material-symbols/star-rounded";
  import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
  import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";
  import RebaseCommand from "@components/RebaseCommand.svelte";
  import Box from "@components/Box.svelte";

  export let image: Image;

  let githubRepo: Object;

  onMount(async () => {
    githubRepo = await getGithubRepository(image.githubRepo).then(
      (data) => data
    );
  });
</script>

{#each image.editions as edition}
  <div class="flex flex-col border-4 border-solid border-indigo-800 p-3">
    <div class="flex flex-row items-center">
      <h2 class="mr-8 text-xl font-bold text-indigo-800">
        {templateStr(image.name, { edition: edition })}
      </h2>
      {#if githubRepo}
        <Box class="ml-auto px-2 py-[0.2rem]">
          <a href={githubRepo["html_url"]} class="flex items-center font-bold">
            <Icon icon={starRounded} />
            {githubRepo["stargazers_count"]}
          </a>
        </Box>
      {/if}
    </div>
    <span>{image.creator}</span>
    <div class="mt-3 flex gap-2 pl-2 mb-1">
      {#if image.featureSet.includes("nvidia")}
        <span title="Includes Nvidia drivers.">
          <Icon icon={nvidiaIcon} width="24" />
        </span>
      {/if}
      {#if image.featureSet.includes("distrobox")}
        <span title="Includes distrobox.">
          <Icon icon={distroboxIcon} width="24" />
        </span>
      {/if}
    </div>
    <Box class="ml-2 mt-3 mb-5 max-w-xl outline-gray-100 hover:outline-gray-100">
      {edition.description}
    </Box>
    <RebaseCommand {image} {edition} />
  </div>
{/each}
