import { type RouteDefinition } from "@/Router/withRelay";
import Query, { type BooksQuery } from "./__generated__/BooksQuery.graphql";
import { BooksQueryDef } from "./BooksQuery";
import { lazy } from "react";

export default {
  path: "/books",
  component: lazy(() => import(".")),
  gqlQuery: BooksQueryDef,
  query: Query,
} satisfies RouteDefinition<BooksQuery>;
