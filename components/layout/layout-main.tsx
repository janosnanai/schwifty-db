import type { ReactNode } from "react";

import Header from "./header";

function LayoutMain({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default LayoutMain;
