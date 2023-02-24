<script lang="ts">
  import ImageCard from "@components/ImageCard.svelte";

  import { ImageFilter, Images } from "@ts/types";
  import imagesUntyped from "@content/images.yml";
  const images: Images = imagesUntyped;

  $: filteredImages = images.images.filter((i) => {
    if (filter.featureSet.length < 1 && filter.desktop.length < 1) return true;

    if (filter.featureSet.length > 0) {
      return filter.featureSet.every((f) => i.featureSet.includes(f));
    }
    return true;
  });

  let filter: ImageFilter = {
    featureSet: [],
    desktop: [],
  };
</script>

<div class="flex flex-wrap gap-2 p-4">
  {#each filteredImages as image}
    <ImageCard {image} {filter} />
  {/each}
</div>
