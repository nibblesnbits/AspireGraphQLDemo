import { type RelayRoute } from "@/Router/withRelay";
import type { HomeQuery } from "./__generated__/HomeQuery.graphql";
import BookDetails from "@/components/BookDetails";
import { Link } from "wouter";
import { useCharacterAddedSubscription } from "@/subscriptions/CharacterAdded";

export default function HomePage({ data }: Readonly<RelayRoute<HomeQuery>>) {
  const bookList = data?.books ?? [];

  useCharacterAddedSubscription(bookList[0]?.id);
  return (
    <div>
      <h1>Bookstore</h1>
      {bookList.length > 0 && (
        <div>
          <h2>Featured Book</h2>
          <BookDetails book={bookList[0]} />
        </div>
      )}
      <div>
        <Link href="/authors">Go to Authors Page</Link>
        <br />
        <Link href="/books">Go to Books Page</Link>
      </div>
    </div>
  );
}
