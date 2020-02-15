import { gql } from "apollo-boost";

export const getAuthorsQuery = gql`
  query {
    authors {
      name
      id
    }
  }
`;

export const getBooksQuery = gql`
  query {
    books {
      name
      id
    }
  }
`;
