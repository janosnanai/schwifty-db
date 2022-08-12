import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import LayoutMain from "../components/layout/layout-main";

import "../styles/globals.css";
import { Characters } from "../graphql/_generated";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: ["filter"],
          merge(
            existing: Characters = { info: {}, results: [] },
            incoming: Characters
          ) {
            return {
              info: incoming.info,
              results: [...existing.results!, ...incoming.results!],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <LayoutMain>
        <Component {...pageProps} />
      </LayoutMain>
    </ApolloProvider>
  );
}

export default MyApp;
