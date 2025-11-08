import { useFragment } from "react-relay";
import AuthorDetailsFragment from "@/fragments/AuthorDetails";
import type { AuthorDetails_author$key } from "@/fragments/__generated__/AuthorDetails_author.graphql";
import { Link } from "wouter";

export default function AuthorDetails(props: {
  author: AuthorDetails_author$key;
}) {
  const data = useFragment(AuthorDetailsFragment, props.author);

  return (
    <>
      <h2>
        <Link to={`/author/${encodeURIComponent(data.id)}`}>{data.name}</Link>
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              <em>Books</em>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.books.map((book) => {
            if (!book) {
              return (
                <tr>
                  <td>No books... yet!</td>
                </tr>
              );
            }

            return (
              <tr key={book.id}>
                <td>
                  <Link to={`/book/${encodeURIComponent(book.id)}`}>
                    {book.title}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
