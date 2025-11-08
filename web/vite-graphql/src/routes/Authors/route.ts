import type { RouteDefinition } from "@/Router/withRelay";
import Query, { type AuthorsQuery } from "./__generated__/AuthorsQuery.graphql";
import { AuthorsQueryDef } from "./AuthorsQuery";
import { lazy } from "react";

export default {
  path: "/authors",
  component: lazy(() => import(".")),
  gqlQuery: AuthorsQueryDef,
  query: Query,
} satisfies RouteDefinition<AuthorsQuery>;
