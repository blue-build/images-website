<script lang="ts">
  export let name: string;
  export let notice: string | undefined = undefined;

  import Box from "@components/Box.svelte";

  import { imagePreferences } from "@ts/stores";
  import { MainEdition } from "@ts/types";

  let selected: boolean;
  imagePreferences.subscribe((pref) => {
    if (pref?.edition != undefined) {
      selected = pref.edition?.name === name;
    }
  });

  function select() {
    imagePreferences.update((pref) => {
      return {
        ...pref,
        edition: MainEdition.all.find((edi) => edi.name == name),
      };
    });
    window.location.replace("/#nvidia");
  }
</script>

<!-- todo logos -->
<button
  on:click={select}
  class={`text-left sm:w-[24rem] w-full
  ${selected ? "outline outline-2 outline-bg-secondary shadow-ubrut-lg" : ""}`}
>
  <Box
    class="text-4xl sm:w-[24rem] w-full h-[12rem] p-10 flex flex-col justify-center"
  >
    <div class="text-fg-primary">{name}</div>
    <div class="text-fg-secondary">
      {MainEdition.all.find((edi) => edi.name == name)?.desktop}
    </div>
    {#if notice != undefined}
      <div class="text-fg-secondary text-sm mt-1">{notice}</div>
    {/if}
  </Box>
</button>
