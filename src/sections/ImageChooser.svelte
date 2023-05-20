<script lang="ts">
  import EditionCard from "@components/ImageChooser/EditionCard.svelte";
  import FoundImage from "@components/ImageChooser/FoundImage.svelte";
  import Metadata from "@components/ImageChooser/Metadata.svelte";
  import Nvidia from "@components/ImageChooser/Nvidia.svelte";

  import { imagePreferences } from "@ts/stores";
  import type { ImagePreferences, Images } from "@ts/types";
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

{pref?.edition.name.toLowerCase()}-{pref?.nvidia ? "nvidia" : "main"}
