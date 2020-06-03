import { gql } from "apollo-boost";

export const ADD_SONGS = gql`
  mutation addSong(
    $artist: String!
    $duration: Float!
    $img: String!
    $title: String!
    $url: String!
  ) {
    insert_songs(
      objects: {
        artist: $artist
        duration: $duration
        img: $img
        title: $title
        url: $url
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
  mutation addOrRemoveFromQueue($input: SongInput!) {
    addOrRemoveFromQueue(input:$input ) @client
  }
`;
