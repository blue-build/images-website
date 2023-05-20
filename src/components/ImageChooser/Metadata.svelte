<script lang="ts">
  import Box from "@components/Box.svelte";
  import { imagePreferences } from "@ts/stores";

  function setName(nvidia: boolean) {
    imagePreferences.update((pref) => {
      return {
        ...pref,
        nvidia: nvidia,
      };
    });
    window.location.replace("/#metadata");
  }
</script>

<!-- todo bind inputs to variables -->
<div id="metadata" class="w-full max-w-4xl mx-auto p-16">
  <Box class="p-8 text-xl flex gap-8">
    <form class="flex flex-col gap-4 w-3/4">
      <div>Please insert some metadata for your image.</div>
      <div class="text-lg flex flex-row gap-4 w-full">
        <label for="name" class="w-32">Name:</label>
        <Box class="outline outline-1 outline-bg-secondary w-full">
          <input
            id="name"
            type="text"
            class="w-full bg-transparent text-fg-primary placeholder:text-fg-secondary p-1 px-2"
            placeholder="my-ublue"
          />
        </Box>
      </div>
      <div class="text-lg flex flex-row gap-4 w-full">
        <label for="name" class="w-32">Description:</label>
        <Box class="outline outline-1 outline-bg-secondary w-full">
          <input
            id="description"
            type="text"
            class="w-full bg-transparent text-fg-primary placeholder:text-fg-secondary p-1 px-2"
            placeholder="This is my personal OS image."
          />
        </Box>
      </div>
    </form>
  </Box>
</div>
