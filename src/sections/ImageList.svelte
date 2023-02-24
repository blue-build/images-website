<script lang="ts">
  import ImageCard from "@components/ImageCard.svelte";

  import type { Images } from "@ts/types";
  import imagesUntyped from "@content/images.yml";
  const images: Images = imagesUntyped;
</script>

<div class="flex flex-wrap gap-2 p-4">
  <ImageCard image={images.images[0]} />
</div>
