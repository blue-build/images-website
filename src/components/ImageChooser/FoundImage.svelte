<script lang="ts">
  import Box from "@components/Box.svelte";
  import ImageCard from "@components/ImageCard/ImageCard.svelte";

  import { Desktop, Feature, features } from "@content/featureDefinitions";

  import { imagePreferences } from "@ts/stores";
  import type { ImagePreferences, Images } from "@ts/types";

  let pref: ImagePreferences;

  imagePreferences.subscribe((p) => {
    pref = p;
  });

  import imagesUntyped from "@content/images.yml";
  const images: Images = imagesUntyped;
</script>

<div id="images" class="w-full max-w-5xl mx-auto flex flex-col gap-8 p-16">
  <div class="text-lg text-fg-primary flex flex-row items-center">
    <div>The following image(s) were found based on your preferences:</div>
    <a href="#metadata" class="ml-auto">
      <Box class="w-fit p-2">Continue to creating your own.</Box>
    </a>
  </div>
  <div class="p-2 flex flex-col gap-4">
    {#each images.images as img}
      {#if (pref.nvidia && img.featureSet.includes(Feature.nvidia)) || (!pref.nvidia && !img.featureSet.includes(Feature.nvidia))}
        <ImageCard
          image={img}
          filter={{ featureSet: [], desktop: pref.edition.desktop }}
        />
      {/if}
    {/each}
  </div>
</div>
