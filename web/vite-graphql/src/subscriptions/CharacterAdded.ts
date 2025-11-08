import { graphql } from "relay-runtime";

import type { GraphQLSubscriptionConfig } from "relay-runtime";
import type {
  CharacterAddedSubscription,
  CharacterAddedSubscription$data,
} from "./__generated__/CharacterAddedSubscription.graphql";
import { useSubscription } from "react-relay";
import { useMemo } from "react";

export function useCharacterAddedSubscription(
  bookId?: string,
  onError?: (error: Error) => void,
  onNext?: (response: CharacterAddedSubscription$data) => void
) {
  return useSubscription<CharacterAddedSubscription>(
    useMemo(
      () =>
        ({
          subscription: graphql`
            subscription CharacterAddedSubscription($bookId: ID) {
              onCharacterAdded(bookId: $bookId) {
                ...BookDetails_book
              }
            }
          `,
          variables: {
            bookId,
          },
          onError: onError,
          onNext: (response) => {
            onNext?.(response as CharacterAddedSubscription$data);
          },
        } satisfies GraphQLSubscriptionConfig<CharacterAddedSubscription>),
      [onError, onNext, bookId]
    )
  );
}
