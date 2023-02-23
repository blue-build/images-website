<script lang="ts">
  import type { Edition, Image } from "@ts/types";
  import { Feature, Desktop } from "@ts/types";

  import Icon from "@iconify/svelte";
  import type { IconifyIcon } from "@iconify/svelte";
  
  import gnomeIcon from "@iconify/icons-simple-icons/gnome";
  import kdeIcon from "@iconify/icons-simple-icons/kde";
  import xfceIcon from "@iconify/icons-simple-icons/xfce";
  import genericWmIcon from "@iconify/icons-material-symbols/grid-view";
  import noDeIcon from "@iconify/icons-material-symbols/close-rounded";
  import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
  import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";

  export let image: Image;
  export let edition: Edition;

  interface IconData {
    condition: boolean;
    icon: IconifyIcon;
    tooltip: string;
  }

  const icons: Array<IconData> = [
    {
      condition: edition.desktop === Desktop.gnome,
      icon: gnomeIcon,
      tooltip: "Uses GNOME by default.",
    },
    {
      condition: edition.desktop === Desktop.kde,
      icon: kdeIcon,
      tooltip: "Uses KDE Plasma by default.",
    },
    {
      condition: edition.desktop === Desktop.xfce,
      icon: xfceIcon,
      tooltip: "Uses XFCE by default.",
    },
    {
      condition: edition.desktop === Desktop.sway,
      icon: genericWmIcon,
      tooltip: "Uses SwayWM by default.",
    },
    {
      condition: edition.desktop === Desktop.none,
      icon: noDeIcon,
      tooltip: "Doesn't include any desktop environment or window manager.",
    },
    {
      condition: image.featureSet.includes(Feature.nvidia),
      icon: nvidiaIcon,
      tooltip: "Includes Nvidia drivers.",
    },
    {
      condition: image.featureSet.includes(Feature.distrobox),
      icon: distroboxIcon,
      tooltip: "Includes distrobox.",
    },
  ];
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
