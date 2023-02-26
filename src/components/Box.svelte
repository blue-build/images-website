<script lang="ts">
  import { darkMode } from "@ts/stores";
  export let dark: boolean = false;

  let defaultClasses: string = "outline outline-2 p-2";
  if (dark || darkMode) {
    defaultClasses +=
      " bg-slate-800 text-white hover:outline-indigo-300 focus:outline-indigo-300 outline-indigo-100 dark:outline-indigo-900 dark:hover:outline-indigo-600 dark:focus:outline-indigo-600";
  } else {
    defaultClasses +=
      " bg-gray-100 text-black hover:outline-indigo-300 focus:outline-indigo-300 outline-indigo-100 dark:outline-indigo-900 dark:hover:outline-indigo-600 dark:focus:outline-indigo-600";
  }
</script>

<div class={`${defaultClasses} ${$$props.class}`}>
  <slot />
</div>
