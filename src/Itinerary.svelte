<script>
  import { getContext } from "svelte";
  import {
    client,
    ITINERARY_LOCATIONS,
    REMOVE_ITINERARY_LOCATION
  } from "./data";

  // Identify an itinerary
  let itineraryRef;
  const itineraryStore = getContext("itinerary");
  itineraryStore.subscribe(value => {
    itineraryRef = value;
  });

  // Grab the itinerary locations
  export function query(id) {
    if (id) {
      return client.query({ query: ITINERARY_LOCATIONS, variables: { id } });
    }
  }

  // Remove
  export async function remove(locationId) {
    // Remove
    await client.query({
      query: REMOVE_ITINERARY_LOCATION,
      variables: { id: locationId }
    });

    // Refresh
    result = query(itineraryRef);
  }

  // Push up and allow simple caching mechanism
  $: result = query(itineraryRef);
</script>

<section>
  <h2>Itinerary Locations</h2>

  {#await result}
    <p>Preloading locations....</p>
  {:then response}
    {#if response}
      <ul>
        {#each response.itinerary.root.locations as location (location.id)}
          <li>
            {location.title}
            {#if location.place.name && location.title !== location.place.name}
              ({location.place.name})
            {/if}
            <button on:click={() => remove(location.id)}>Remove</button>
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
