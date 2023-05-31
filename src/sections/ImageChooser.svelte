<script lang="ts">
  import EditionCard from "@components/ImageChooser/EditionCard.svelte";
  import Nvidia from "@components/ImageChooser/Nvidia.svelte";
  import FoundImage from "@components/ImageChooser/FoundImage.svelte";
  import Metadata from "@components/ImageChooser/Metadata.svelte";
  import GithubLogin from "@components/ImageChooser/GithubLogin.svelte";
  import CreateRepo from "@components/ImageChooser/CreateRepo.svelte";
  import Cosign from "@components/ImageChooser/Cosign.svelte";

  import { imagePreferences, customImage } from "@ts/stores";
  import type { ImagePreferences } from "@ts/types";
  import { MainEdition } from "@ts/types";
  import Final from "@components/ImageChooser/Final.svelte";

  let pref: ImagePreferences;

  imagePreferences.subscribe((p) => {
    pref = p;
  });
</script>

<!-- todo get data from content.yml -->
<div
  id="editions"
  class="w-full max-w-7xl mx-auto h-full flex flex-row flex-wrap justify-center items-center sm:p-16 p-8 gap-16"
>
  {#each MainEdition.all as edi}
    <EditionCard name={edi.name} />
  {/each}
</div>

<hr class="w-[90vw] mx-auto my-16" />

<Nvidia />

<hr class="w-[90vw] mx-auto my-16" />

<FoundImage />

<hr class="w-[90vw] mx-auto my-16" />

<Metadata />

<hr class="w-[90vw] mx-auto my-16" />

<GithubLogin />

{#if $customImage.auth != undefined}
  <hr class="w-[90vw] mx-auto my-16" />

  <CreateRepo />

  {#if $customImage.repo != undefined}
    <hr class="w-[90vw] mx-auto my-16" />

    <Cosign />

    {#if $customImage.signingDone}
      <hr class="w-[90vw] mx-auto my-16" />

      <Final />
    {/if}
  {/if}
{/if}

<div class="h-[25vh]" />
