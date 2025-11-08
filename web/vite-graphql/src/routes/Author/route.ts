import { type RouteDefinition } from "@/Router/withRelay";
import Query, { type AuthorQuery } from "./__generated__/AuthorQuery.graphql";
import { AuthorQueryDef } from "./AuthorQuery";
import { lazy } from "react";

export default {
  path: "/author/:id?",
  component: lazy(() => import(".")),
  gqlQuery: AuthorQueryDef,
  query: Query,
} satisfies RouteDefinition<AuthorQuery>;
