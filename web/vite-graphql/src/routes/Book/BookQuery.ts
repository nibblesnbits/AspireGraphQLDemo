import { graphql } from "relay-runtime";

export const BookQueryDef = graphql`
  query BookQuery($id: ID!) {
    book(id: $id) {
      id
      title
      ...BookDetails_book
    }
  }
`;
