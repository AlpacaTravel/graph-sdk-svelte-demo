<script>
  import Add from "./Add.svelte";

  export let item;

  $: stringified = stringified = JSON.stringify(item);
</script>

<h2>Place</h2>
{#if item.resource.id}
  <Add place={item.resource} {item} />
{/if}
{stringified}
