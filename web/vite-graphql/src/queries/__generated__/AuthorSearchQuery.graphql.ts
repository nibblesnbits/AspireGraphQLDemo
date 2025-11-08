/**
 * @generated SignedSource<<dd715846fa74db41a25e27ffbbb72d25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AuthorSearchQuery$variables = {
  search: string;
};
export type AuthorSearchQuery$data = {
  readonly searchAuthors: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
};
export type AuthorSearchQuery = {
  response: AuthorSearchQuery$data;
  variables: AuthorSearchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "order",
        "value": [
          {
            "name": "ASC"
          }
        ]
      },
      {
        "kind": "Variable",
        "name": "search",
        "variableName": "search"
      }
    ],
    "concreteType": "Author",
    "kind": "LinkedField",
    "name": "searchAuthors",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthorSearchQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthorSearchQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f0d28c1a73f3d5482cd65753bccfa01e",
    "id": null,
    "metadata": {},
    "name": "AuthorSearchQuery",
    "operationKind": "query",
    "text": "query AuthorSearchQuery(\n  $search: String!\n) {\n  searchAuthors(search: $search, order: [{name: ASC}]) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "fcb8df376e5379ced048d8662be5e814";

export default node;
