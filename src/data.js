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

export const ITEMS = `
  query Items($id: ID!) {
    collectionTmp(id: $id) {
      items {
        id
        title
        resource {
          id
          name
          position
        }
      }
    }
  }
`;

export const PLACE_PRESENT = `
  query IsPlaceInItinerary($id: ID!, $place: ID!) {
    itinerary(id: $id) {
      root {
        descendants(filterByPlaceId: $place) {
          id
        }
      }
    }
  }
`;

export const CREATE_ITINERARY = `
  mutation CreateAnonymousItinerary {
    createItinerary {
      itinerary { id }
    }
  }
`;

export const CREATE_ITINERARY_LOCATION = `
  mutation CreateLocation($id: ID!, $placeId: ID!, $title: String!) {
    insertItineraryLocation(
      itineraryId: $id
      location: {
        title: $title
        place: {
          id: $placeId
        }
      }
    ) {
      location { id }
    }
  }
`;
