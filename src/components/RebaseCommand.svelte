<script lang="ts">
  import { templateStr } from "@ts/templateStrings";
  import type { Image, Edition } from "@ts/types";
  import Box from "@components/Box.svelte";

  import Icon from "@iconify/svelte";
  import copyIcon from "@iconify/icons-material-symbols/content-copy-outline-sharp";

  export let image: Image;
  export let edition: Edition;

  let versions =
    edition.versions === undefined ? image.versions : edition.versions;
  let selectedVersion = versions[0];

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

<div class="flex w-fit flex-col gap-2 p-1">
  <!-- Odd comments and newline placing is to prevent extra whitespace -->
  <span>Rebase to this image:</span>
  <Box dark class="m-1 font-mono text-sm">
    rpm-ostree <wbr />rebase <wbr />ostree-unverified-registry<wbr
    /><!--  

-->:<span class="font-semibold"
      >{templateStr(image.imageUrl, {
        edition: edition,
      })}</span
    ><wbr /><!-- 
    
    -->:<span class="group inline-block">
      <button
        title="Select the desired image version."
        class="underline-dotted select-text font-semibold underline"
        on:click={toggleDropdown}
        >{selectedVersion}
        <span
          bind:this={dropdownIcon}
          class="inline-block select-none transition">▼</span
        ></button
      >
      <div
        bind:this={dropdown}
        class="absolute box-content flex hidden flex-col gap-2 group-hover:flex"
      >
        <Box dark class="mt-1">
          {#each versions as v}
            {#if v !== selectedVersion}
              <button
                class="group block hover:cursor-pointer hover:underline"
                on:click={() => (selectedVersion = v)}
              >
                {v}
              </button>
            {/if}
          {/each}
        </Box>
      </div>

      <button
        title="Copy rebase command to clipboard."
        class="relative top-1 ml-2 mr-1 inline before:absolute before:right-0 before:-top-9 before:text-gray-900 focus:before:content-['copied!']"
        on:click={copyRebaseCommand}><Icon icon={copyIcon} width="16" /></button
      >
    </span>
  </Box>
</div>

<style>
  .underline-dotted {
    text-decoration-style: dotted;
  }
</style>
