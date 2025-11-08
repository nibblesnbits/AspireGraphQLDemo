import { graphql } from "relay-runtime";


export const HomeQueryDef = graphql`
  query HomeQuery {
    books {
      id
      ...BookDetails_book
    }
  }
`;
