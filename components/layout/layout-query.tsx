import type { ReactNode } from "react";

import Header from "./header";

function LayoutQuery({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default LayoutQuery;
