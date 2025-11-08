import { type RouteDefinition } from "@/Router/withRelay";
import Query, { type HomeQuery } from "./__generated__/HomeQuery.graphql";
import { HomeQueryDef } from "./HomeQuery";
import { lazy } from "react";

export default {
  path: "/",
  component: lazy(() => import(".")),
  gqlQuery: HomeQueryDef,
  query: Query,
} satisfies RouteDefinition<HomeQuery>;
