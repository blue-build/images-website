<script lang="ts">
  import ImageCard from "@components/ImageCard.svelte";
  import Box from "@components/Box.svelte";
  import Checkbox from "@components/Checkbox.svelte";

  import Icon from "@iconify/svelte";
  import type { IconifyIcon } from "@iconify/svelte";
  import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
  import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";

  import type { ImageFilter, Images } from "@ts/types";
  import { Feature, Desktop } from "@ts/types";

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

  interface FeatureButton {
    text: string;
    feature: Feature;
    icon: IconifyIcon;
  }
  const featureButtons: Array<FeatureButton> = [
    {
      text: "Nvidia",
      feature: Feature.nvidia,
      icon: nvidiaIcon,
    },
    {
      text: "Distrobox",
      feature: Feature.distrobox,
      icon: distroboxIcon,
    },
  ];
</script>

<div
  class="m-4 flex max-w-4xl flex-row gap-2 border-4 border-indigo-900 bg-indigo-100 p-3"
>
  <Box>
    <label for="de">Desktop:</label>
    <select
      class="bg-transparent text-center"
      id="de"
      bind:value={filter.desktop}
    >
      <option value="" selected>-</option>
      {#each Object.values(Desktop) as d}
        <option value={d}>{d}</option>
      {/each}
    </select>
  </Box>

  {#each featureButtons as fb}
    <Checkbox
      change={(e) => {
        if (e.target?.checked) {
          filter.featureSet = [...filter.featureSet, fb.feature];
        } else {
          filter.featureSet = filter.featureSet.filter((f) => f !== fb.feature);
        }
        console.log(fb.feature);
      }}
    >
      <Box
        class="flex flex-row gap-2 outline-2 group-[.isChecked]:bg-indigo-300 group-[.isChecked]:outline group-[.isChecked]:outline-indigo-500 group-[.isChecked]:hover:outline-indigo-400"
      >
        <Icon icon={fb.icon} class="self-center" />
        {fb.text}
      </Box>
    </Checkbox>
  {/each}
</div>

<div class="flex flex-col gap-2 p-4 w-max">
  {#each filteredImages as image}
    <ImageCard {image} {filter} />
  {/each}
</div>
