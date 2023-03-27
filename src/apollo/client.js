import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";
import "../../config";

// Apollo client for runtime queries
export const client = new ApolloClient({
  uri: global.env.GATSBY_APOLLO_CLIENT,
  fetch,
});
