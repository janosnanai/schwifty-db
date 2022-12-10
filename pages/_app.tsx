import type { AppProps } from "next/app";

import { Roboto, Nunito } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "700", "900"],
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <div id="page-top"></div>
          <div id="banner-root"></div>
          <main className={`${roboto.variable} ${nunito.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
          {process.env.NODE_ENV !== "production" && (
            <ReactQueryDevtools initialIsOpen={false} position="top-right" />
          )}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
