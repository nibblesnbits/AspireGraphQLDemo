import { type RouteDefinition } from "@/Router/withRelay";
import Query, { type BookQuery } from "./__generated__/BookQuery.graphql";
import { BookQueryDef } from "./BookQuery";
import { lazy } from "react";

export default {
  path: "/book/:id?",
  component: lazy(() => import(".")),
  gqlQuery: BookQueryDef,
  query: Query,
} satisfies RouteDefinition<BookQuery>;
