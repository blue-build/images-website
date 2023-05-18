<script>
  export let name;
  export let env;
</script>

<!-- todo the shadow disappears in dark mode + logos -->
<div
  class="text-4xl min-w-[24rem] bg-blue-300 p-8 py-12 relative z-10 shadow-ubrut"
>
  <div class="text-indigo-900">{name}</div>
  <div class="text-indigo-500">{env}</div>
</div>
