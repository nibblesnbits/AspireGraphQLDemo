import { graphql, useLazyLoadQuery } from "react-relay";
import type { BookHoverQuery } from "./__generated__/BookHoverQuery.graphql";
import BookDetails from "./BookDetails";

export const BookHoverQueryDef = graphql`
  query BookHoverQuery($id: ID!) {
    book(id: $id) {
      id
      title
      ...BookDetails_book
    }
  }
`;

type BookHoverProps = Readonly<{ id: string }>;

export default function BookHover({ id }: BookHoverProps) {
  const data = useLazyLoadQuery<BookHoverQuery>(BookHoverQueryDef, { id });
  return (
    <div>
      <h1>{data.book?.title}</h1>
      {data.book && <BookDetails book={data.book} />}
    </div>
  );
}
