<script lang="ts">
  import ImageCard from "@components/ImageCard.svelte";
  import Box from "@components/Box.svelte";
  import Checkbox from "@components/Checkbox.svelte";

  import Icon from "@iconify/svelte";

  import type { ImageFilter, Images } from "@ts/types";
  import { Desktop, features } from "@content/featureDefinitions";

  import imagesUntyped from "@content/images.yml";
  const images: Images = imagesUntyped;

  $: filteredImages = filterImages(filter);
  function filterImages(filter: ImageFilter) {
    return images.images.filter((i) => {
      if (filter.featureSet.length < 1 && filter.desktop === null) return true;
      if (filter.featureSet.length > 0) {
        return filter.featureSet.every((f) => i.featureSet.includes(f));
      }
      return true;
    });
  }

  let filter: ImageFilter = {
    featureSet: [],
    desktop: "",
  };
</script>

<div class="min-h-screen p-4 dark:bg-gray-900" id="images">
  <div
    class="mx-auto flex max-w-5xl flex-row gap-2 border-4 border-indigo-900 bg-indigo-100 p-3 dark:border-indigo-700 dark:bg-gray-900"
  >
    <Box
      class={`${
        filter.desktop !== ""
          ? "bg-indigo-300 outline outline-indigo-500 hover:outline-indigo-400"
          : ""
      }`}
    >
      <label for="de">Desktop:</label>
      <select
        class="cursor-pointer bg-transparent text-center"
        id="de"
        bind:value={filter.desktop}
      >
        <option class="text-black" value="" selected>-</option>
        {#each Object.values(Desktop) as d}
          <option class="text-black" value={d}>{d}</option>
        {/each}
      </select>
    </Box>

    {#each features as feature}
      <Checkbox
        change={(e) => {
          if (e.target?.checked) {
            filter.featureSet = [...filter.featureSet, feature.feature];
          } else {
            filter.featureSet = filter.featureSet.filter(
              (f) => f !== feature.feature
            );
          }
        }}
      >
        <Box
          class="flex flex-row gap-2 outline-2 group-[.isChecked]:bg-indigo-300 group-[.isChecked]:outline group-[.isChecked]:outline-indigo-500 group-[.isChecked]:hover:outline-indigo-400"
        >
          <Icon icon={feature.icon} class="self-center" />
          {feature.buttonTitle}
        </Box>
      </Checkbox>
    {/each}
  </div>

  <div class="m-2 mx-auto mt-6 flex w-max max-w-full flex-col gap-6 p-4">
    {#each filteredImages as image}
      <ImageCard {image} {filter} />
    {/each}
  </div>
</div>
