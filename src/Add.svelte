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

  const itineraryStore = getContext("itinerary");

  let itinerary;

  const unsubscribe = itineraryStore.subscribe(id => {
    itinerary = id;
  });

  const query = async function(p) {
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

  const create = async function() {
    const result = await client.query({
      query: CREATE_ITINERARY
    });

    return result.createItinerary.itinerary.id;
  };

  const add = async function(p) {
    if (p && p.id) {
      let itineraryValue = itinerary;
      if (!itineraryValue) {
        itineraryValue = await create();
        itineraryStore.update(() => itineraryValue);
      }

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

  $: result = query(place);
</script>

{#if !itinerary}
  <button on:click={() => add(place)}>Add</button>
{:else}
  {#await result}
    <p>checking itinerary</p>
  {:then response}
    {#if response && response.itinerary.root.descendants.length === 0}
      <button on:click={() => add(place)}>Add</button>
    {/if}
  {/await}
{/if}
