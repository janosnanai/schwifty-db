import type { ReactNode } from "react";

import Header from "./header";
import Footer from "./footer";

function LayoutMain({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default LayoutMain;
