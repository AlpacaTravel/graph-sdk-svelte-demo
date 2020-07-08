import { Client } from "@alpaca-travel/graph-sdk";

export const client = new Client({
  apiKey:
    // Place your API Key here
    "pk.eyJwaWQiOiI2MDRqSmZlOTJEeTRjYVBZV1hrZlVHIiwiaWF0IjoxNTg4MjkxMzAyfQ._YTgoyEscLTVbwUaeDr7VQLaF6TpjpIf3hc8pqOjNt8",
});

/* --- Example GraphQL Queries --- */

export const ITINERARY_LOCATIONS = /* GraphQL */ `
  query Locations($id: ID!) {
    itinerary(id: $id) {
      descendants(first: 100) {
        nodes {
          ... on ItineraryLocation {
            id
            title
            place {
              id
              name
              position
            }
          }
        }
      }
    }
  }
`;

export const ITEMS = /* GraphQL */ `
  query Items($collectionIds: [String!]) {
    collectionItems(collectionIds: $collectionIds, first: 5) {
      nodes {
        __typename
        ... on CollectionLocation {
          id
          title
          place {
            id
            position
            name
          }
        }
      }
    }
  }
`;

export const ITEM = /* GraphQL */ `
  query Item($id: ID!) {
    collectionItem(id: $id) {
      id
      ... on CollectionLocation {
        title
        tags
        description
        place {
          id
          position
          address {
            addressLineOne
            locality
            regionCode
          }
        }
      }
    }
  }
`;

export const PLACE_PRESENT = /* GraphQL */ `
  query IsPlaceInItinerary($id: ID!, $place: ID!) {
    itinerary(id: $id) {
      descendants(first: 1, placeId: $place) {
        nodes {
          id
        }
      }
    }
  }
`;

export const CREATE_ITINERARY = /* GraphQL */ `
  mutation CreateAnonymousItinerary {
    createItinerary {
      itinerary {
        id
      }
    }
  }
`;

export const CREATE_ITINERARY_LOCATION = /* GraphQL */ `
  mutation CreateLocation($id: ID!, $placeId: ID!, $title: String!) {
    createItineraryLocation(
      itineraryId: $id
      location: { title: $title, place: { id: $placeId } }
    ) {
      location {
        id
      }
    }
  }
`;

export const REMOVE_ITINERARY_LOCATION = /* GraphQL */ `
  mutation RemoveLocation($id: ID!) {
    deleteItineraryItem(id: $id) {
      id
    }
  }
`;
