<script lang="ts">
  import type { Edition, Image } from "@ts/types";
  import {
    Feature,
    Desktop,
    desktops,
    features,
  } from "@content/featureDefinitions";

  import Icon from "@iconify/svelte";
  import type { IconifyIcon } from "@iconify/svelte";

  import gnomeIcon from "@iconify/icons-simple-icons/gnome";
  import kdeIcon from "@iconify/icons-simple-icons/kde";
  import xfceIcon from "@iconify/icons-simple-icons/xfce";
  import genericWmIcon from "@iconify/icons-material-symbols/grid-view";
  import genericDeIcon from "@iconify/icons-material-symbols/dock-to-right";
  import noDeIcon from "@iconify/icons-material-symbols/close-rounded";
  import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
  import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";
  import autoUpdateIcon from "@iconify/icons-material-symbols/cycle";

  export let image: Image;
  export let edition: Edition;

  interface IconData {
    condition: boolean;
    icon: IconifyIcon;
    tooltip: string;
  }

  const icons: Array<IconData> = [];

  desktops.forEach((desktop) => {
    icons.push({
      condition: edition.desktop === desktop.desktop,
      icon: desktop.icon,
      tooltip: desktop.tooltip,
    });
  });

  features.forEach((feature) => {
    icons.push({
      condition: image.featureSet.includes(feature.feature),
      icon: feature.icon,
      tooltip: feature.tooltip,
    });
  });
</script>

<div class="mt-4 mb-2 flex gap-2 pl-2">
  {#each icons as icon}
    {#if icon.condition}
      <span title={icon.tooltip}>
        <Icon icon={icon.icon} width="24" />
      </span>
    {/if}
  {/each}
</div>
