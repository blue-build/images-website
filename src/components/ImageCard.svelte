<script lang="ts">
  import { templateStr } from "@ts/templateStrings";
  import type { Edition, Image } from "@ts/types";
  export let image: Image;
</script>

{#each image.editions as edition}
  <div class="flex flex-col border-4 border-solid border-indigo-800 p-2">
    <h2 class="mr-5 text-xl font-bold text-indigo-800">
      {templateStr(image.name, { edition: edition })}
    </h2>
    <span>{image.creator}</span>
  </div>
{/each}
