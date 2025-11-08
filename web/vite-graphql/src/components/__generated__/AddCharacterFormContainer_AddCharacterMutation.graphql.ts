/**
 * @generated SignedSource<<5c12787f36bfbbf312938a2524b7e05d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddCharacterInput = {
  input: CharacterInput;
};
export type CharacterInput = {
  bookId: string;
  name: string;
};
export type AddCharacterFormContainer_AddCharacterMutation$variables = {
  addCharacterInput: AddCharacterInput;
};
export type AddCharacterFormContainer_AddCharacterMutation$data = {
  readonly addCharacter: {
    readonly character: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"CharacterDetails_character">;
    } | null | undefined;
  };
};
export type AddCharacterFormContainer_AddCharacterMutation = {
  response: AddCharacterFormContainer_AddCharacterMutation$data;
  variables: AddCharacterFormContainer_AddCharacterMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "addCharacterInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "addCharacterInput"
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
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  {
    "kind": "Literal",
    "name": "order",
    "value": [
      {
        "name": "ASC"
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddCharacterFormContainer_AddCharacterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddCharacterPayload",
        "kind": "LinkedField",
        "name": "addCharacter",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CharacterDetails_character"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddCharacterFormContainer_AddCharacterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddCharacterPayload",
        "kind": "LinkedField",
        "name": "addCharacter",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
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
                  },
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
                    "concreteType": "CharactersConnection",
                    "kind": "LinkedField",
                    "name": "characters",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CharactersEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cursor",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Character",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "__typename",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "kind": "LinkedField",
                        "name": "pageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "hasNextPage",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endCursor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "characters(first:5,order:[{\"name\":\"ASC\"}])"
                  },
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
                    "filters": [
                      "order"
                    ],
                    "handle": "connection",
                    "key": "BookDetails_book_characters",
                    "kind": "LinkedHandle",
                    "name": "characters"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8863de35972024e5f040fc37bbdac2e6",
    "id": null,
    "metadata": {},
    "name": "AddCharacterFormContainer_AddCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation AddCharacterFormContainer_AddCharacterMutation(\n  $addCharacterInput: AddCharacterInput!\n) {\n  addCharacter(input: $addCharacterInput) {\n    character {\n      id\n      ...CharacterDetails_character\n    }\n  }\n}\n\nfragment BookDetails_book on Book {\n  id\n  title\n  characters(first: 5, order: [{name: ASC}]) {\n    edges {\n      cursor\n      node {\n        name\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment CharacterDetails_character on Character {\n  id\n  name\n  books {\n    id\n    title\n    ...BookDetails_book\n  }\n}\n"
  }
};
})();

(node as any).hash = "fdee30b96b52c3b942f7b585b34d9cd9";

export default node;
