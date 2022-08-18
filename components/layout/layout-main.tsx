import type { ReactNode } from "react";

import Navbar from "./navbar";

function LayoutMain({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}

export default LayoutMain;
