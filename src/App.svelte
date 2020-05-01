<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";

  import Places from "./Places.svelte";
  import Itinerary from "./Itinerary.svelte";

  // Context to the itinerary
  const itinerary = writable();
  setContext("itinerary", itinerary);

  // Cheap nav
  let section = window.location.hash.slice(1);
  async function hashchange() {
    section = window.location.hash.slice(1);
  }
</script>

<svelte:window on:hashchange={hashchange} />

<section>
  {#if section === '/places'}
    <a href="#/itinerary">View Itinerary</a>
    <Places />
  {:else}
    <a href="#/places">View Itinerary</a>
    <Itinerary />
  {/if}
</section>
