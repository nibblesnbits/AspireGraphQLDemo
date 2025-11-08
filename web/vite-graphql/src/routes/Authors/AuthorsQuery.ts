import { graphql } from "relay-runtime";

export const AuthorsQueryDef = graphql`
  query AuthorsQuery {
    authors {
      id
      ...AuthorDetails_author
    }
  }
`;
