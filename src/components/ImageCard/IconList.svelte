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
