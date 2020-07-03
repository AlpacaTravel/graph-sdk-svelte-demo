<script>
  import { client, ITEM } from "./data";
  import AddItineraryLocation from "./AddItineraryLocation.svelte";

  export let item;

  $: stringified = stringified = JSON.stringify(item);

  export function query() {
    const id = item.id;
    return client.query({ query: ITEM, variables: { id } });
  }

  let result = query();
  $: stringified, (result = query());
</script>

<h2>
  {item.title}
  {#if item.place.name && item.place.name !== item.title}
    ({item.place.name})
  {/if}
</h2>
{#await result}
  <p>Loading more information....</p>
  {stringified}
{:then response}
  {#if response.collectionItem.place.address}
    {response.collectionItem.place.address.addressLineOne}, {response.collectionItem.place.address.locality}
    {response.collectionItem.place.address.regionCode}
  {/if}
{:catch error}
  <p>Error loading item: {error}</p>
{/await}

{#if item.place.id}
  <AddItineraryLocation from={item} />
{/if}
