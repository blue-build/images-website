<script lang="ts">
  export let checked: boolean = false;
  export let change = (e: Event) => {};

  let uid = Math.random().toString(16).slice(2);
</script>

<input
  type="checkbox"
  id={`checkbox-${uid}`}
  class="hidden"
  bind:checked
  on:change={change}
/>
<label
  for={`checkbox-${uid}`}
  class="group cursor-pointer"
  class:isChecked={checked}
>
  <slot />
</label>
