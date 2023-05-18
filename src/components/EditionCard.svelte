<script>
  export let name;
  export let env;

  import Box from "@components/Box.svelte";
</script>

<!-- todo logos -->
<Box class="text-4xl min-w-[24rem] p-10 py-12">
  <div class="text-fg-primary">{name}</div>
  <div class="text-fg-secondary">{env}</div>
</Box>
