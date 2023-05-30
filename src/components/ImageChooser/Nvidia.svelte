<script lang="ts">
  import Box from "@components/Box.svelte";
  import { imagePreferences } from "@ts/stores";

  let nvidia: boolean;
  imagePreferences.subscribe((pref) => {
    if (pref?.nvidia != undefined) {
      nvidia = pref?.nvidia;
    }
  });

  function set(nvidia: boolean) {
    imagePreferences.update((pref) => {
      return {
        ...pref,
        nvidia: nvidia,
      };
    });
    window.location.replace("/#images");
  }
</script>

<div id="nvidia" class="w-full max-w-4xl mx-auto p-8">
  <Box class="p-8 text-xl flex flex-wrap gap-8">
    <div class="my-auto mr-9">Do you want Nvidia drivers?</div>
    <button
      on:click={() => {
        set(true);
      }}
    >
      <Box
        border
        class={`bg-bg-primary p-4 w-32 shadow-ubrut hover:shadow-ubrut-lg ${
          nvidia ? "outline-2 !shadow-ubrut-lg" : "outline-1"
        }`}
      >
        Yes
      </Box>
    </button>
    <button
      on:click={() => {
        set(false);
      }}
    >
      <Box
        border
        class={`bg-bg-primary p-4 w-32 shadow-ubrut hover:shadow-ubrut-lg ${
          !nvidia ? "outline-2 !shadow-ubrut-lg" : "outline-1"
        }`}
      >
        No
      </Box>
    </button>
  </Box>
</div>
