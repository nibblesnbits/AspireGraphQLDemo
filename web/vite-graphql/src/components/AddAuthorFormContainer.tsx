import { useState } from "react";
import CreateAuthorForm, {
  type CreateAuthorFormInputs,
} from "./CreateAuthorForm";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import type {
  AddAuthorFormContainer_AddAuthorMutation,
  AddAuthorFormContainer_AddAuthorMutation$data,
  AddAuthorFormContainer_AddAuthorMutation$variables,
} from "./__generated__/AddAuthorFormContainer_AddAuthorMutation.graphql";

export default function AddAuthorFormContainer({
  onCompleted,
}: {
  onCompleted?: (author: { id: string }) => void;
}) {
  const [addAuthorErrors, setAddAuthorErrors] = useState<Error>();

  const handleSubmitForm = async (data: CreateAuthorFormInputs) => {
    try {
      const result = await addAuthor({
        input: {
          ...data,
        },
      });
      if (result.addAuthor.author) {
        onCompleted?.(result.addAuthor.author);
      }
    } catch (error) {
      setAddAuthorErrors(error as Error);
    }
  };

  const [addAuthorMutation] =
    useMutation<AddAuthorFormContainer_AddAuthorMutation>(graphql`
      mutation AddAuthorFormContainer_AddAuthorMutation(
        $addAuthorInput: AddAuthorInput!
      ) {
        addAuthor(input: $addAuthorInput) {
          author {
            id
            name
          }
        }
      }
    `);

  const addAuthor = (
    addAuthorInput: AddAuthorFormContainer_AddAuthorMutation$variables["addAuthorInput"]
  ) => {
    return new Promise<AddAuthorFormContainer_AddAuthorMutation$data>(
      (res, rej) => {
        addAuthorMutation({
          variables: { addAuthorInput },
          onError: rej,
          onCompleted: res,
        });
      }
    );
  };

  return (
    <div>
      <h1>Create a New Author</h1>
      <CreateAuthorForm onSubmitForm={handleSubmitForm} />
      <div>
        {addAuthorErrors && (
          <div>
            <h2>Errors:</h2>
            <p>{addAuthorErrors.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
