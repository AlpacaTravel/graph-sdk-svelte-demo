<script>
  import { client, REMOVE_ITINERARY_LOCATION } from "./data";

  export let itineraryLocation;
  export let onRemove = () => {};

  export async function remove({ id }) {
    await client.query({
      query: REMOVE_ITINERARY_LOCATION,
      variables: { id }
    });

    onRemove();
  }
</script>

{#if itineraryLocation}
  <button on:click={() => remove(itineraryLocation)}>Remove</button>
{/if}
