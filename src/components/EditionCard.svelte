<script>
  export let name;
  export let env;
</script>

<!-- todo the shadow disappears in dark mode + logos -->
<div
  class="text-4xl min-w-[24rem] bg-bg-primary p-10 py-12 relative z-10 shadow-ubrut"
>
  <div class="text-fg-primary">{name}</div>
  <div class="text-fg-secondary">{env}</div>
</div>
