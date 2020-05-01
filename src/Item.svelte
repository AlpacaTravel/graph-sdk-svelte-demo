<script>
  import AddItineraryLocation from "./AddItineraryLocation.svelte";

  export let item;

  $: stringified = stringified = JSON.stringify(item);
</script>

<h2>
  {item.title}
  {#if item.resource.name && item.resource.name !== item.title}
    ({item.resource.name})
  {/if}
</h2>
{#if item.resource.id}
  <AddItineraryLocation from={item} />
{/if}
{stringified}
