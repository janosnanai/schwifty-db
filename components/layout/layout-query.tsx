import type { ReactNode } from "react";

import Header from "./header";

function LayoutQuery({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-zinc-50 dark:bg-zinc-900">{children}</main>
    </>
  );
}

export default LayoutQuery;
