/**
 * @generated SignedSource<<5ae16c07f498e8ab381febea3f1f8932>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthorQuery$variables = {
  id: string;
};
export type AuthorQuery$data = {
  readonly author: {
    readonly books: ReadonlyArray<{
      readonly id: string;
      readonly title: string | null | undefined;
    }>;
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"AuthorDetails_author">;
  } | null | undefined;
};
export type AuthorQuery = {
  response: AuthorQuery$data;
  variables: AuthorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Book",
  "kind": "LinkedField",
  "name": "books",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuthorDetails_author"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9c40852eb21ff6d82778efc114e92f95",
    "id": null,
    "metadata": {},
    "name": "AuthorQuery",
    "operationKind": "query",
    "text": "query AuthorQuery(\n  $id: ID!\n) {\n  author(id: $id) {\n    id\n    name\n    books {\n      id\n      title\n    }\n    ...AuthorDetails_author\n  }\n}\n\nfragment AuthorDetails_author on Author {\n  id\n  name\n  books {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "e989d85e47c4d630d5b1ce4beffb9fb3";

export default node;
