<script>
  import { getContext } from "svelte";
  import {
    client,
    PLACE_PRESENT,
    CREATE_ITINERARY,
    CREATE_ITINERARY_LOCATION
  } from "./data";

  export let place = null;
  export let item = null;

  // Itinerary selection
  let itinerary;

  // Watch the itinerary selection
  const itineraryStore = getContext("itinerary");
  const unsubscribe = itineraryStore.subscribe(id => {
    itinerary = id;
  });

  // Check if we have the current place selected
  const queryPlaceInItinerary = async function(p) {
    if (itinerary && p && p.id) {
      return client.query({
        query: PLACE_PRESENT,
        variables: {
          id: itinerary,
          place: p.id
        }
      });
    }
  };

  // Create an anonymous itinerary
  const createAnonymousItinerary = async function() {
    const result = await client.query({
      query: CREATE_ITINERARY
    });

    return result.createItinerary.itinerary.id;
  };

  // Add a location
  const addLocation = async function(p) {
    if (p && p.id) {
      let itineraryValue = itinerary;

      // If we don't have an itinerary
      if (!itineraryValue) {
        itineraryValue = await createAnonymousItinerary();
        itineraryStore.update(() => itineraryValue);
      }

      // Add the location
      await client.query({
        query: CREATE_ITINERARY_LOCATION,
        variables: {
          id: itineraryValue,
          placeId: p.id,
          title: p.name || item.title
        }
      });
    }
  };

  $: result = queryPlaceInItinerary(place);
</script>

{#if !itinerary}
  <button on:click={() => addLocation(place)}>Add</button>
{:else}
  {#await result}
    <p>checking itinerary</p>
  {:then response}
    {#if response && response.itinerary}
      {#if response.itinerary.root.descendants.length === 0}
        <button on:click={() => addLocation(place)}>Add</button>
      {:else}Added{/if}
    {/if}
  {/await}
{/if}
