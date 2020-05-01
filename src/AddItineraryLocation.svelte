<script>
  import { getContext } from "svelte";
  import {
    client,
    PLACE_PRESENT,
    CREATE_ITINERARY,
    CREATE_ITINERARY_LOCATION
  } from "./data";

  // Props
  export let from = null;
  export let onAdd = () => {};

  // Itinerary reference..
  let itinerary;
  $: place = from.resource || from.place;
  $: title = place.name || from.title;

  // Watch the reference to the current itinerary
  const itineraryStore = getContext("itinerary");
  const unsubscribe = itineraryStore.subscribe(id => {
    itinerary = id;
  });

  // Check if we have the current place selected
  async function queryPlaceInItinerary({ id }) {
    if (itinerary && id) {
      return client.query({
        query: PLACE_PRESENT,
        variables: {
          id: itinerary,
          place: id
        }
      });
    }
  }

  // Add a location
  export async function addItineraryLocation({ title, place }) {
    if (place && place.id) {
      let ref = itinerary;

      // If we don't have an itinerary
      if (!ref) {
        // Create a new itinerary
        const result = await client.query({
          query: CREATE_ITINERARY
        });

        // Hold on to the created itinerary
        ref = result.createItinerary.itinerary.id;

        // Update our local store of the created itinerary ref
        itineraryStore.update(() => ref);
      }

      // Add the location
      await client.query({
        query: CREATE_ITINERARY_LOCATION,
        variables: {
          id: ref,
          placeId: place.id,
          title: title
        }
      });

      onAdd();
    }
  }

  $: result = queryPlaceInItinerary(place);
</script>

{#if !itinerary}
  <button on:click={() => addItineraryLocation({ title, place })}>Add</button>
{:else}
  {#await result}
    <p>checking itinerary</p>
  {:then response}
    {#if response && response.itinerary}
      {#if response.itinerary.root.descendants.length === 0}
        <button on:click={() => addItineraryLocation({ title, place })}>
          Add
        </button>
      {:else}Added{/if}
    {/if}
  {/await}
{/if}
