import type { ReactNode } from "react";

import Navbar from "./navbar";

function LayoutMain({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}

export default LayoutMain;
