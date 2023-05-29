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

  let pref: ImagePreferences;

  imagePreferences.subscribe((p) => {
    pref = p;
  });
</script>

<!-- todo get data from content.yml -->
<div
  id="editions"
  class="w-full max-w-7xl mx-auto h-full flex flex-row flex-wrap justify-center items-center p-16 gap-16"
>
  {#each MainEdition.all as edi}
    <EditionCard
      name={edi.name}
      notice={edi.name == "Onyx"
        ? "This image will only be available once Fedora 39 is released."
        : undefined}
    />
  {/each}
</div>

<hr class="w-[90vw] mx-auto my-12" />

<Nvidia />

<hr class="w-[90vw] mx-auto my-12" />

<FoundImage />

<hr class="w-[90vw] mx-auto my-12" />

<Metadata />

<hr class="w-[90vw] mx-auto my-12" />

<GithubLogin />

{#if $customImage.auth != undefined}
  <hr class="w-[90vw] mx-auto my-12" />

  <CreateRepo />

  {#if $customImage.repo != undefined}
    <hr class="w-[90vw] mx-auto my-12" />

    <Cosign />
  {/if}
{/if}

<div class="h-screen" />
