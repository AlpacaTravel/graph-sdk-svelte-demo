<script>
  import { getContext } from "svelte";
  import { client, LOCATIONS } from "./data";

  export let onItem = console.log;

  const itinerary = getContext("itinerary");
  console.log(itinerary);

  export function query(id) {
    if (id) {
      return client.query({ query: LOCATIONS, variables: { id } });
    }
  }

  // Push up and allow simple caching mechanism
  let result;

  const unsubscribe = itinerary.subscribe(value => {
    result = query(value);
  });
</script>

<section>
  <h2>Locations (simple query)</h2>

  {#await result}
    <p>Preloading locations....</p>
  {:then response}
    {#if response}
      <ul>
        {#each response.itinerary.root.locations as location (location.id)}
          <li on:click={() => onItem(location)}>
            {location.title}
            {#if location.place.name && location.title !== location.place.name}
              ({location.place.name})
            {/if}
          </li>
        {:else}
          <li>No locations found</li>
        {/each}
      </ul>
    {:else}
      <p>You haven't started an itinerary</p>
    {/if}
  {:catch error}
    <p>Error preloading locations: {error}</p>
  {/await}
</section>
