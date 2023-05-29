<script lang="ts">
  import Box from "@components/Box.svelte";
  import ImageCard from "@components/ImageCard/ImageCard.svelte";

  import { Desktop, Feature, features } from "@content/featureDefinitions";

  import { imagePreferences } from "@ts/stores";
  import type { ImagePreferences, Images, Image } from "@ts/types";

  let pref: ImagePreferences;

  imagePreferences.subscribe((p) => {
    pref = p;
  });

  import imagesUntyped from "@content/images.yml";
  const images: Images = imagesUntyped;

  let filtered: Array<Image>;
  $: filtered = images.images.filter((img) => {
    const nvidiaFilter =
      (pref.nvidia && img.featureSet.includes(Feature.nvidia)) ||
      (!pref.nvidia && !img.featureSet.includes(Feature.nvidia));
    const desktopFilter =
      img.editions.filter((e) => {
        return e.desktop == pref.edition.desktop;
      }).length > 0;
    return nvidiaFilter && desktopFilter;
  });
</script>

<div id="images" class="w-full max-w-5xl mx-auto flex flex-col gap-8 p-16">
  <div class="text-lg text-fg-primary flex flex-row items-center gap-8">
    <div>
      The following image(s) were found based on your preferences. <br /> If there's
      nothing here, an image with the selected preferences is not available yet.
    </div>
    {#if filtered.length > 0}
      <a href="#metadata" class="ml-auto">
        <Box class="w-fit p-4">Continue to creating your own.</Box>
      </a>
    {/if}
  </div>
  <div class="p-2 flex flex-col gap-4">
    {#if filtered.length > 0}
      {#each filtered as img}
        <ImageCard
          image={img}
          filter={{ featureSet: [], desktop: pref.edition.desktop }}
        />
      {/each}
    {:else}
      <span class="text-fg-primary">Nothing found :(</span>
    {/if}
  </div>
</div>
