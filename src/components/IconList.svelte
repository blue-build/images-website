<script lang="ts">
  import { Feature, Desktop, Edition, Image } from "@ts/types";

  import Icon from "@iconify/svelte";
  import gnomeIcon from "@iconify/icons-simple-icons/gnome";
  import kdeIcon from "@iconify/icons-simple-icons/kde";
  import xfceIcon from '@iconify/icons-simple-icons/xfce';
  import genericWmIcon from '@iconify/icons-material-symbols/grid-view';
  import noDeIcon from '@iconify/icons-material-symbols/close-rounded';
  import nvidiaIcon from "@iconify/icons-simple-icons/nvidia";
  import distroboxIcon from "@iconify/icons-simple-icons/hackthebox";

  export let image: Image;
  export let edition: Edition;
</script>

<div class="mt-4 mb-2 flex gap-2 pl-2">
  {#if edition.desktop === Desktop.gnome}
    <span title="Uses GNOME by default.">
      <Icon icon={gnomeIcon} width="24" />
    </span>
  {/if}
  {#if edition.desktop === Desktop.kde}
    <span title="Uses KDE Plasma by default.">
      <Icon icon={kdeIcon} width="24" />
    </span>
  {/if}
  {#if edition.desktop === Desktop.xfce}
    <span title="Uses XFCE by default.">
        <Icon icon={xfceIcon} width="24" />
    </span>
    {/if}
    {#if edition.desktop === Desktop.sway}
    <span title="Uses SwayWM by default.">
        <Icon icon={genericWmIcon} width="24" />
    </span>
    {/if}
    {#if edition.desktop === Desktop.none}
    <span title="Doesn't include any desktop environment or window manager.">
        <Icon icon={noDeIcon} width="24" />
    </span>
    {/if}
  {#if image.featureSet.includes(Feature.nvidia)}
    <span title="Includes Nvidia drivers.">
      <Icon icon={nvidiaIcon} width="24" />
    </span>
  {/if}
  {#if image.featureSet.includes(Feature.distrobox)}
    <span title="Includes distrobox.">
      <Icon icon={distroboxIcon} width="24" />
    </span>
  {/if}
</div>
