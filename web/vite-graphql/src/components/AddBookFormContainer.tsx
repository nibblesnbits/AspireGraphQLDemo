import { useState } from "react";
import CreateBookForm, { type CreateBookFormInputs } from "./CreateBookForm";
import { useMutation, useRelayEnvironment } from "react-relay";
import { fetchQuery, graphql } from "relay-runtime";
import type {
  AddBookFormContainer_AddBookMutation,
  AddBookFormContainer_AddBookMutation$data,
  AddBookFormContainer_AddBookMutation$variables,
} from "./__generated__/AddBookFormContainer_AddBookMutation.graphql";
import { AuthorsQueryDef } from "@/queries/AuthorSearchQuery";
import type { AuthorSearchQuery } from "@/queries/__generated__/AuthorSearchQuery.graphql";

export default function AddBookFormContainer({
  authorId,
  onCompleted,
}: {
  authorId?: string;
  onCompleted?: (book: { id: string }) => void;
}) {
  const relayEnvironment = useRelayEnvironment();

  const [addBookError, setAddBookError] = useState<Error>();
  const handleSubmitForm = async (data: CreateBookFormInputs) => {
    try {
      const result = await addBook({
        input: data,
      });
      if (result.addBook.book?.id) {
        onCompleted?.(result.addBook.book);
      }
    } catch (error) {
      setAddBookError(error as Error);
    }
  };

  const [addBookMutation] = useMutation<AddBookFormContainer_AddBookMutation>(
    graphql`
      mutation AddBookFormContainer_AddBookMutation(
        $addBookInput: AddBookInput!
      ) {
        addBook(input: $addBookInput) {
          book {
            id
            ...BookDetails_book
          }
        }
      }
    `
  );

  const addBook = (
    addBookInput: AddBookFormContainer_AddBookMutation$variables["addBookInput"]
  ) => {
    return new Promise<AddBookFormContainer_AddBookMutation$data>(
      (res, rej) => {
        addBookMutation({
          variables: { addBookInput },
          onError: rej,
          onCompleted: res,
        });
      }
    );
  };

  const searchAuthor = (term: string) => {
    return new Promise<{ id: string; name: string }[]>((res, rej) => {
      fetchQuery<AuthorSearchQuery>(relayEnvironment, AuthorsQueryDef, {
        search: term,
      }).subscribe({
        next: (data) => {
          res(
            data.searchAuthors.map((author) => ({
              id: author.id,
              name: author.name,
            }))
          );
        },
        error: rej,
      });
    });
  };

  return (
    <div>
      <h1>Create a New Book</h1>
      <CreateBookForm
        onSubmitForm={handleSubmitForm}
        search={searchAuthor}
        authorId={authorId}
      />
      {addBookError && (
        <div>
          <h2>Error:</h2>
          <p>{addBookError.message}</p>
        </div>
      )}
    </div>
  );
}
