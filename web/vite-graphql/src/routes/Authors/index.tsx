import { type RelayRoute } from "@/Router/withRelay";
import type { AuthorsQuery } from "./__generated__/AuthorsQuery.graphql";
import AuthorDetails from "@/components/AuthorDetails";
import AddAuthorFormContainer from "@/components/AddAuthorFormContainer";
import { useLocation } from "wouter";

export default function AuthorsPage({
  data,
}: Readonly<RelayRoute<AuthorsQuery>>) {
  const [, navTo] = useLocation();
  return (
    <div>
      <h1>Authors</h1>
      {data.authors.length === 0 ? (
        <p>No authors available.</p>
      ) : (
        <ul>
          {data.authors.map((author) => (
            <li key={author.id}>
              <AuthorDetails author={author} />
            </li>
          ))}
        </ul>
      )}

      <hr />
      <div>
        <AddAuthorFormContainer
          onCompleted={(author) =>
            navTo(`/author/${encodeURIComponent(author.id)}`)
          }
        />
      </div>
    </div>
  );
}
