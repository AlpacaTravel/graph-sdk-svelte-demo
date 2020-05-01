<script>
  import { client, LOCATIONS } from "./data";

  export function preload() {
    const id = "itinerary/97b0cac1-52c3-11ea-96fe-067ec0c7e8f4";
    return client.query({ query: LOCATIONS, variables: { id } });
  }

  const locationsPreloading = preload();
</script>

<section>
  <h2>Locations (simple query)</h2>

  {#await locationsPreloading}
    <p>Preloading locations....</p>
  {:then preloaded}
    <ul>
      {#each preloaded.itinerary.root.locations as location (location.id)}
        <li>
          {location.title}
          {#if location.place.name && location.title !== location.place.name}
            ({location.place.name})
          {/if}
        </li>
      {:else}
        <li>No locations found</li>
      {/each}
    </ul>
  {:catch error}
    <p>Error preloading locations: {error}</p>
  {/await}
</section>
