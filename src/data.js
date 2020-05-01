import { Client } from "@alpaca-travel/graph-sdk";

export const client = new Client({
  apiKey:
    // Place your API Key here
    "pk.eyJwaWQiOiI2MDRqSmZlOTJEeTRjYVBZV1hrZlVHIiwiaWF0IjoxNTg4MjkxMzAyfQ._YTgoyEscLTVbwUaeDr7VQLaF6TpjpIf3hc8pqOjNt8",
});

export const LOCATIONS = `
query Locations($id: ID!) {
  itinerary(id: $id) {
    root {
      locations: descendants(type: ItineraryLocation) {
        ... on ItineraryLocation {
          id
          title
          place {
            name
            position
          }
        }
      }
    }
  }
}
`;
