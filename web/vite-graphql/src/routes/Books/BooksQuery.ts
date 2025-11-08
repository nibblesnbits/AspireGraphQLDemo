import { graphql } from "relay-runtime";

export const BooksQueryDef = graphql`
  query BooksQuery {
    books {
      id
      title
      ...BookDetails_book
    }
  }
`;
