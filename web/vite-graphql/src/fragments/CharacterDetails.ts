import { graphql } from "react-relay";

export default graphql`
  fragment CharacterDetails_character on Character {
    id
    name
    books {
      id
      title
      ...BookDetails_book
    }
  }
`;
