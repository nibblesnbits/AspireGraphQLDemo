import { graphql } from "relay-runtime";

export const AuthorQueryDef = graphql`
  query AuthorQuery($id: ID!) {
    author(id: $id) {
      id
      name
      books {
        id
        title
      }
      ...AuthorDetails_author
    }
  }
`;
