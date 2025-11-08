import { usePaginationFragment } from "react-relay";
import type { BookDetails_book$key } from "@/fragments/__generated__/BookDetails_book.graphql";
import BookDetailsFragment from "@/fragments/BookDetails";
import { Link } from "wouter";

export default function BookDetails(props: { book: BookDetails_book$key }) {
  const { data, loadNext, hasNext } = usePaginationFragment(
    BookDetailsFragment,
    props.book
  );

  if (!data.characters?.edges?.length) {
    return <div>No characters found for this book.</div>;
  }

  return (
    <>
      <h2>
        <Link to={`/book/${encodeURIComponent(data.id)}`}>{data.title}</Link>
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <em>Characters</em>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.characters?.edges?.map((edge) =>
            edge?.node ? (
              <tr key={edge.cursor}>
                <td>{edge.node.name}</td>
              </tr>
            ) : null
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>
              {hasNext && (
                <button
                  onClick={() => {
                    loadNext(5);
                  }}
                >
                  Load more characters
                </button>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
