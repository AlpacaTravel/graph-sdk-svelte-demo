<script>
  import { client, ITEMS } from "./data";

  export let onItem = console.log;

  export function query() {
    const id = "collection/6ea6iIu3imPan8jjDHVerY";
    return client.query({ query: ITEMS, variables: { id } });
  }

  // Push up and allow simple caching mechanism
  const result = query();
</script>

<section>
  <h2>Items (simple query)</h2>

  {#await result}
    <p>Preloading items....</p>
  {:then response}
    <ul>
      {#each response.collectionTmp.items as item (item.id)}
        <li on:click={() => onItem(item)}>
          {item.title}
          {#if item.resource.name && item.title !== item.resource.name}
            ({item.resource.name})
          {/if}
        </li>
      {:else}
        <li>No items found</li>
      {/each}
    </ul>
  {:catch error}
    <p>Error preloading items: {error}</p>
  {/await}
</section>
