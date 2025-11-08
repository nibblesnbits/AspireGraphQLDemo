import { graphql } from "relay-runtime";

export default graphql`
  fragment BookDetails_book on Book
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
    order: { type: "[CharacterSortInput!]", defaultValue: [{ name: ASC }] }
  )
  @refetchable(queryName: "BookDetails_book_paginationQuery") {
    id
    title
    characters(after: $cursor, first: $count, order: $order)
      @connection(key: "BookDetails_book_characters") {
      edges {
        cursor
        node {
          name
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
