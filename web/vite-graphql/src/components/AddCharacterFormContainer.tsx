import { useState } from "react";
import CreateCharacterForm, {
  type CreateCharacterFormInputs,
} from "./CreateCharacterForm";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import type {
  AddCharacterFormContainer_AddCharacterMutation,
  AddCharacterFormContainer_AddCharacterMutation$data,
  AddCharacterFormContainer_AddCharacterMutation$variables,
} from "./__generated__/AddCharacterFormContainer_AddCharacterMutation.graphql";

export default function AddCharacterFormContainer({
  bookId,
  onCompleted,
}: {
  bookId: string;
  onCompleted?: (character: { id: string }) => void;
}) {
  const [addCharacterError, setAddCharacterError] = useState<Error>();
  const handleSubmitForm = async (data: CreateCharacterFormInputs) => {
    try {
      const result = await addCharacter({
        input: {
          ...data,
        },
      });
      if (result.addCharacter.character?.id) {
        onCompleted?.(result.addCharacter.character);
      }
    } catch (error) {
      setAddCharacterError(error as Error);
    }
  };

  const [addCharacterMutation] =
    useMutation<AddCharacterFormContainer_AddCharacterMutation>(
      graphql`
        mutation AddCharacterFormContainer_AddCharacterMutation(
          $addCharacterInput: AddCharacterInput!
        ) {
          addCharacter(input: $addCharacterInput) {
            character {
              id
              ...CharacterDetails_character
            }
          }
        }
      `
    );

  const addCharacter = (
    addCharacterInput: AddCharacterFormContainer_AddCharacterMutation$variables["addCharacterInput"]
  ) => {
    return new Promise<AddCharacterFormContainer_AddCharacterMutation$data>(
      (res, rej) => {
        addCharacterMutation({
          variables: {
            addCharacterInput: {
              input: {
                name: addCharacterInput.input.name,
                bookId,
              },
            },
          },
          onError: rej,
          onCompleted: res,
        });
      }
    );
  };

  return (
    <div>
      <h1>Create a New Character</h1>
      <CreateCharacterForm onSubmitForm={handleSubmitForm} />
      {addCharacterError && (
        <div>
          <h2>Errors:</h2>
          <p>{addCharacterError.message}</p>
        </div>
      )}
    </div>
  );
}
