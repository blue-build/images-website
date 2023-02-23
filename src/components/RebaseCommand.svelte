<script lang="ts">
  import { templateStr } from "@ts/templateStrings";
  import type { Image, Edition } from "@ts/types";

  export let image: Image;
  export let edition: Edition;

  let selectedVersion = image.versions[0];
</script>

<div class="flex flex-col gap-2 p-1">
  <span>Rebase to this image:</span>
  <span class="bg-indigo-100 p-2 font-mono text-sm">
    rpm-ostree <wbr>rebase <wbr>ostree-unverified-registry<wbr>
    :{templateStr(image.imageUrl, {
      edition: edition,
    })}<wbr>:{selectedVersion}

    <select bind:value={selectedVersion}>
      {#each image.versions as v}
        <option value={v}>{v}</option>
      {/each}
    </select>
  </span>
</div>
