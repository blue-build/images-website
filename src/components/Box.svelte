<script lang="ts">
  let defaultClasses: string =
    "p-2 bg-bg-primary text-fg-primary shadow-ubrut-sm hover:shadow-ubrut focus:shadow-ubrut";
</script>

<div class={`${defaultClasses} ${$$props.class}`}>
  <slot />
</div>
