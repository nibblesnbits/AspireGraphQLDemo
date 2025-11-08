import { type RelayRoute } from "@/Router/withRelay";
import type { BooksQuery } from "./__generated__/BooksQuery.graphql";
import BookDetails from "@/components/BookDetails";
import BookHover from "@/components/BookHover";
import { Suspense, useState } from "react";
import AddBookFormContainer from "@/components/AddBookFormContainer";
import { Link } from "wouter";

export default function BooksPage({ data }: Readonly<RelayRoute<BooksQuery>>) {
  const books = data?.books?.filter((b) => b != null) ?? [];
  const [clickedBook, setClickedBook] = useState<{ id: string } | null>(null);

  const showInfo = (id: string) => () => setClickedBook({ id });

  return (
    <div>
      <h1>Books</h1>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h4>
                <Link to={`/book/${encodeURIComponent(book.id)}`}>
                  {book.title}
                </Link>
              </h4>
              <BookDetails book={book} />
              <button onClick={showInfo(book.id)}>More info</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        {clickedBook && (
          <Suspense fallback="Loading...">
            <BookHover id={clickedBook.id} />
          </Suspense>
        )}
      </div>

      <hr />
      <div>
        <AddBookFormContainer />
      </div>
    </div>
  );
}
