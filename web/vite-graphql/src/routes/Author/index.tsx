import { type RelayRoute } from "@/Router/withRelay";
import type { AuthorQuery } from "./__generated__/AuthorQuery.graphql";
import AuthorDetails from "@/components/AuthorDetails";
import AddBookFormContainer from "@/components/AddBookFormContainer";
import { useLocation } from "wouter";

export default function AuthorPage({
  data: { author },
}: Readonly<RelayRoute<AuthorQuery>>) {
  const [, navTo] = useLocation();

  if (!author) {
    return <p>Author not found.</p>;
  }

  return (
    <div>
      <h1>{author.name}</h1>
      <AuthorDetails author={author} />

      <hr />
      <div>
        <h3>Add Book</h3>
        <AddBookFormContainer
          authorId={author?.id}
          onCompleted={(book) => navTo(`/book/${encodeURIComponent(book.id)}`)}
        />
      </div>
    </div>
  );
}
