import "../styles/globals.css";
import type { AppProps } from "next/app";

import LayoutMain from "../components/layout/layout-main";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutMain>
      <Component {...pageProps} />
    </LayoutMain>
  );
}

export default MyApp;
