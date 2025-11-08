import { graphql } from "relay-runtime";

export const AuthorsQueryDef = graphql`
  query AuthorSearchQuery($search: String!) {
    searchAuthors(search: $search, order: [{ name: ASC }]) {
      id
      name
    }
  }
`;
