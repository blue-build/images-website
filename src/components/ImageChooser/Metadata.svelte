<script lang="ts">
  import Box from "@components/Box.svelte";
  import { customImage, imagePreferences } from "@ts/stores";
  import type { CustomImage } from "@ts/types";

  let name: string;
  let desc: string;

  $: setName(name);
  $: setDesc(desc);

  let custom: CustomImage;

  imagePreferences.subscribe((p) => {
    customImage.update((c) => {
      return {
        ...c,
        baseImage: `${p?.edition.name.toLowerCase()}-${
          p?.nvidia ? "nvidia" : "main"
        }`,
      };
    });
  });

  customImage.subscribe((c) => {
    custom = c;
  });

  function setName(name: string) {
    customImage.update((custom) => {
      return {
        ...custom,
        name: name,
      };
    });
  }

  function setDesc(desc: string) {
    customImage.update((custom) => {
      return {
        ...custom,
        description: desc,
      };
    });
  }
</script>

<!-- todo bind inputs to variables -->
<div id="metadata" class="w-full max-w-4xl mx-auto p-16">
  <Box class="p-8 text-xl flex gap-8">
    <form class="flex flex-col gap-4 w-3/4">
      <div>Custom image details:</div>
      <div class="text-lg flex flex-row gap-4 w-full">
        <label for="name" class="w-32">Name:</label>
        <Box class="w-full" border>
          <input
            bind:value={name}
            id="name"
            type="text"
            class="w-full bg-transparent text-fg-primary placeholder:text-fg-secondary p-1 px-2"
            placeholder="my-ublue"
          />
        </Box>
      </div>
      <div class="text-lg flex flex-row gap-4 w-full">
        <label for="name" class="w-32">Description:</label>
        <Box class="w-full" border>
          <input
            bind:value={desc}
            id="description"
            type="text"
            class="w-full bg-transparent text-fg-primary placeholder:text-fg-secondary p-1 px-2"
            placeholder="This is my personal OS image."
          />
        </Box>
      </div>
      <div class="text-lg flex flex-row gap-4 w-full">
        <div class="w-32">Base image:</div>
        <Box
          class="w-full bg-transparent text-fg-primary placeholder:text-fg-secondary p-1 px-2"
          border
        >
          {custom.baseImage}
        </Box>
      </div>
    </form>
  </Box>
</div>
