<script lang="ts">
  import type { Edition, Image } from "@ts/types";

  import Icon from "@iconify/svelte";
  import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
  import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";

  export let image: Image;
  export let edition: Edition;
</script>

<div class="mt-4 mb-2 flex gap-2 pl-2">
  {#if image.featureSet.includes("nvidia")}
    <span title="Includes Nvidia drivers.">
      <Icon icon={nvidiaIcon} width="24" />
    </span>
  {/if}
  {#if image.featureSet.includes("distrobox")}
    <span title="Includes distrobox.">
      <Icon icon={distroboxIcon} width="24" />
    </span>
  {/if}
</div>
