/**
 * @generated SignedSource<<4da9cc5d951eec9ee02a408668529a1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CharacterDetails_character$data = {
  readonly books: ReadonlyArray<{
    readonly id: string;
    readonly title: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"BookDetails_book">;
  }>;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "CharacterDetails_character";
};
export type CharacterDetails_character$key = {
  readonly " $data"?: CharacterDetails_character$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterDetails_character">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterDetails_character",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Book",
      "kind": "LinkedField",
      "name": "books",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "BookDetails_book"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "5fb323cf6734eb78216d33c925573cb7";

export default node;
