<script lang="ts">
  import { darkModeStore } from "@ts/stores";
  let darkMode: boolean;
  darkModeStore.subscribe((d) => {
    darkMode = d;
  });

  import Icon from "@iconify/svelte";
  import darkModeIcon from "@iconify/icons-material-symbols/dark-mode";
  import lightModeIcon from "@iconify/icons-material-symbols/light-mode";

  import Box from "@components/Box.svelte";

  $: currentIcon = darkMode ? darkModeIcon : lightModeIcon;

  function switchMode() {
    darkModeStore.set(!darkMode);
  }
</script>

<button on:click={switchMode} class={`ml-auto ${$$props.class}`}>
  <Box class="p-2">
    <Icon icon={currentIcon} />
  </Box>
</button>
