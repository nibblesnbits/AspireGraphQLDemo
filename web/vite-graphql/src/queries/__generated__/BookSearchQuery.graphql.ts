/**
 * @generated SignedSource<<acea632f05ed99a7364948d6418fd5c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type BookSearchQuery$variables = {
  search: string;
};
export type BookSearchQuery$data = {
  readonly searchBooks: ReadonlyArray<{
    readonly id: string;
    readonly title: string | null | undefined;
  }>;
};
export type BookSearchQuery = {
  response: BookSearchQuery$data;
  variables: BookSearchQuery$variables;
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
            "title": "ASC"
          }
        ]
      },
      {
        "kind": "Variable",
        "name": "search",
        "variableName": "search"
      }
    ],
    "concreteType": "Book",
    "kind": "LinkedField",
    "name": "searchBooks",
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
        "name": "title",
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
    "name": "BookSearchQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BookSearchQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3cafa9292e5d9670a31a316b497d2643",
    "id": null,
    "metadata": {},
    "name": "BookSearchQuery",
    "operationKind": "query",
    "text": "query BookSearchQuery(\n  $search: String!\n) {\n  searchBooks(search: $search, order: [{title: ASC}]) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "950c1dcdd0ed6bb1e51c45d39803cfd7";

export default node;
