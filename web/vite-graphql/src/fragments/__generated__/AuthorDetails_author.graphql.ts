/**
 * @generated SignedSource<<cebdca8ff3a17a6fb954f6fe13b9b5a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthorDetails_author$data = {
  readonly books: ReadonlyArray<{
    readonly id: string;
    readonly title: string | null | undefined;
  }>;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "AuthorDetails_author";
};
export type AuthorDetails_author$key = {
  readonly " $data"?: AuthorDetails_author$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuthorDetails_author">;
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
  "name": "AuthorDetails_author",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Author",
  "abstractKey": null
};
})();

(node as any).hash = "5ad7a119f47e68efd0026f40cf40567c";

export default node;
