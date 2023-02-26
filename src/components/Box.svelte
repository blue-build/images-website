<script lang="ts">
  import { darkMode } from "@ts/stores";
  export let dark: boolean = false;

  let defaultClasses: string;
  if (dark || darkMode) {
    defaultClasses =
      "bg-gray-900 outline outline-2 p-2 text-white hover:outline-indigo-300 focus:outline-indigo-300 outline-indigo-100 dark:outline-indigo-900 dark:hover:outline-indigo-600 dark:focus:outline-indigo-600";
  } else {
    defaultClasses =
      "bg-gray-100 outline outline-2 p-2 text-black hover:outline-indigo-300 focus:outline-indigo-300 outline-indigo-100 dark:outline-indigo-900 dark:hover:outline-indigo-600 dark:focus:outline-indigo-600";
  }
</script>

<div class={`${defaultClasses} ${$$props.class}`}>
  <slot />
</div>
