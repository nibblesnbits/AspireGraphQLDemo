import { graphql } from "react-relay";

export default graphql`
  fragment AuthorDetails_author on Author {
    id
    name
    books {
      id
      title
    }
  }
`;
