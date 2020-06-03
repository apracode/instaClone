import { gql } from "apollo-boost";

export const GET_QUEUED_SONGS = gql`
  query getQueuedSongs {
    queue @client(order_by: { created_at: desc }) {
      artist
      duration
      img
      title
      url
      id
    }
  }
`;
