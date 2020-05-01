<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import Places from "./Places.svelte";
  import Itinerary from "./Itinerary.svelte";

  const itinerary = writable();

  setContext("itinerary", itinerary);

  // Create a navigation
  let section = "places";
  const setSection = s => {
    section = s;
  };
</script>

<section>
  {#if section === 'places'}
    <button on:click={() => setSection('itinerary')}>View Itinerary</button>
    <Places />
  {:else}
    <button on:click={() => setSection('places')}>Find Places</button>
    <Itinerary />
  {/if}
</section>
