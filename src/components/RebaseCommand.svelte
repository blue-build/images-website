<script lang="ts">
  import { templateStr } from "@ts/templateStrings";
  import type { Image, Edition } from "@ts/types";

  import Icon from "@iconify/svelte";
  import copyIcon from "@iconify/icons-material-symbols/content-copy-outline-sharp";

  export let image: Image;
  export let edition: Edition;

  let selectedVersion = image.versions[0];

  let dropdown: HTMLDivElement;
  let dropdownIcon: HTMLSpanElement;

  const toggleDropdown = () => {
    dropdown.classList.toggle("hidden");
    dropdownIcon.classList.toggle("rotate-90");
  };

  const copyRebaseCommand = () => {
    navigator.clipboard.writeText(
      `rpm-ostree rebase ostree-unverified-registry:${templateStr(
        image.imageUrl,
        { edition: edition }
      )}:${selectedVersion}`
    );
  };
</script>

<div class="flex flex-col gap-2 p-1">
  <span>Rebase to this image:</span>
  <span class="bg-indigo-100 p-2 font-mono text-sm">
    rpm-ostree <wbr />rebase <wbr />ostree-unverified-registry<wbr
    /><!--  

-->:{templateStr(image.imageUrl, {
      edition: edition,
    })}<wbr /><!-- 
    
    -->:<span class="group inline-block">
      <button
        class="underline-dotted select-text underline"
        on:click={toggleDropdown}
        >{selectedVersion}
        <span
          bind:this={dropdownIcon}
          class="inline-block select-none transition">▼</span
        ></button
      >
      <button
        class="relative top-1 inline before:absolute before:right-0 before:-top-9 focus:before:content-['copied!']"
        on:click={copyRebaseCommand}><Icon icon={copyIcon} width="15" /></button
      >
      <div
        bind:this={dropdown}
        class="absolute box-content flex hidden flex-col gap-2 bg-indigo-100 p-2 group-hover:flex"
      >
        {#each image.versions as v}
          {#if v !== selectedVersion}
            <button
              class="group block hover:cursor-pointer hover:underline"
              on:click={() => (selectedVersion = v)}
            >
              {v}
            </button>
          {/if}
        {/each}
      </div>
    </span>
  </span>
</div>

<style>
  .underline-dotted {
    text-decoration-style: dotted;
  }
</style>
