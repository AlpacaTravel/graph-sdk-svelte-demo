<script>
  import { client, ITEMS } from "./data";

  export let onItem;

  // Load our collection items
  export function query() {
    const id = "collection/4m2hSusvAkPHpLb36NJ5BV";
    return client.query({ query: ITEMS, variables: { collectionIds: id } });
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
      {#each response.collectionItems.nodes as item (item.id)}
        <li on:click={() => onItem(item)}>
          {item.title}
          {#if item.place.name && item.title !== item.place.name}
            ({item.place.name})
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
