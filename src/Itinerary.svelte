<script>
  import { getContext } from "svelte";
  import {
    client,
    ITINERARY_LOCATIONS,
    REMOVE_ITINERARY_LOCATION
  } from "./data";
  import RemoveItineraryLocation from "./RemoveItineraryLocation.svelte";

  // Obtain a context to the itinerary ref
  let itineraryRef;
  const itineraryStore = getContext("itinerary");
  itineraryStore.subscribe(value => {
    // e.g. itinerary/abcd
    itineraryRef = value;
  });

  // Grab the itinerary locations
  export function fetchItineraryLocations(ref) {
    if (ref) {
      // Use GraphQL to obtain the list of locations
      // See the data.js for GraphQL queries
      return client.query({
        query: ITINERARY_LOCATIONS,
        variables: { id: ref }
      });
    }
  }

  function refresh() {
    result = fetchItineraryLocations(itineraryRef);
  }

  // Push up and allow simple caching mechanism
  $: result = fetchItineraryLocations(itineraryRef);
</script>

<section>
  <h2>Itinerary</h2>

  {#await result}
    <p>Obtaining locations....</p>
  {:then response}
    {#if response}
      <ul>
        {#each response.itinerary.descendants.nodes as location (location.id)}
          <li>
            {location.title}
            {#if location.place.name && location.title !== location.place.name}
              ({location.place.name})
            {/if}
            <RemoveItineraryLocation
              itineraryLocation={location}
              onRemove={refresh} />
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
