<script lang="ts">
  let defaultClasses =
    "bg-bg-primary text-fg-primary shadow-ubrut-sm hover:shadow-ubrut focus:shadow-ubrut";
  export let border: boolean = false;
  let borderClasses = border ? "outline outline-1 outline-bg-secondary" : "";
</script>

<div class={`${defaultClasses} ${borderClasses} ${$$props.class}`}>
  <slot />
</div>
