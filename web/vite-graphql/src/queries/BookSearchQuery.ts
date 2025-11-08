import { graphql } from "relay-runtime";

export const BookSearchQueryDef = graphql`
  query BookSearchQuery($search: String!) {
    searchBooks(search: $search, order: [{ title: ASC }]) {
      id
      title
    }
  }
`;
