/**
 * @generated SignedSource<<59010266c916f3ac0cf6626d40f5642f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AddAuthorInput = {
  input: AuthorInput;
};
export type AuthorInput = {
  name: string;
};
export type AddAuthorFormContainer_AddAuthorMutation$variables = {
  addAuthorInput: AddAuthorInput;
};
export type AddAuthorFormContainer_AddAuthorMutation$data = {
  readonly addAuthor: {
    readonly author: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
  };
};
export type AddAuthorFormContainer_AddAuthorMutation = {
  response: AddAuthorFormContainer_AddAuthorMutation$data;
  variables: AddAuthorFormContainer_AddAuthorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "addAuthorInput"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "addAuthorInput"
      }
    ],
    "concreteType": "AddAuthorPayload",
    "kind": "LinkedField",
    "name": "addAuthor",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Author",
        "kind": "LinkedField",
        "name": "author",
        "plural": false,
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddAuthorFormContainer_AddAuthorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddAuthorFormContainer_AddAuthorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "84d2abdbcff22689eb116de3fd858be3",
    "id": null,
    "metadata": {},
    "name": "AddAuthorFormContainer_AddAuthorMutation",
    "operationKind": "mutation",
    "text": "mutation AddAuthorFormContainer_AddAuthorMutation(\n  $addAuthorInput: AddAuthorInput!\n) {\n  addAuthor(input: $addAuthorInput) {\n    author {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8acddf5ce95955d4592cbcb35d6c5c1d";

export default node;
