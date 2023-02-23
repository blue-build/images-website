<script lang="ts">
    export let dark: boolean;

    let defaultClasses: string;
    if (dark) {
        defaultClasses = "bg-gray-900 outline outline-2 p-2 text-white hover:outline-indigo-300 focus:outline-indigo-300 outline-indigo-100";
    }
    else {
        defaultClasses = "bg-gray-100 outline outline-2 p-2 text-black hover:outline-indigo-300 focus:outline-indigo-300 outline-indigo-100";
    }
</script>

<div class={`${defaultClasses} ${$$props.class}`}>
    <slot/>
</div>