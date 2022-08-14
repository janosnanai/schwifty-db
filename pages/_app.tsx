import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LayoutMain from "../components/layout/layout-main";

import "../styles/globals.css";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <LayoutMain>
        <Component {...pageProps} />
      </LayoutMain>
    </QueryClientProvider>
  );
}

export default MyApp;
