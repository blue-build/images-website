<script lang="ts">
  import { getGithubRepository } from "@ts/apiHelpers";
  import { templateStr } from "@ts/templateStrings";
  import type { Image } from "@ts/types";
  import Icon from '@iconify/svelte';
  import starRounded from '@iconify/icons-material-symbols/star-rounded';
  import { onMount } from "svelte";
  export let image: Image;

  // TODO figure out how to async

  let githubRepo : Object;
  
  onMount(async () =>  {
    githubRepo = await getGithubRepository(image.githubRepo).then((data) => data);
  })
</script>

{#each image.editions as edition}
  <div class="flex flex-col border-4 border-solid border-indigo-800 p-3">
    <div class="flex flex-row items-center">
      <h2 class="mr-8 text-xl font-bold text-indigo-800">
        {templateStr(image.name, { edition: edition })}
      </h2>
      <div class="flex justify-self-end self-center items-center text-indigo-800 font-bold">
        <Icon icon={starRounded}/>
        {#if githubRepo}
        {githubRepo["stargazers_count"]}
        {/if}
      </div>
    </div>
    <span>{image.creator}</span> 
  </div>
{/each}
