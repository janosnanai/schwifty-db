import { ReactNode } from "react";
import Navbar from "./navbar";

function LayoutMain({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <>
      <header className="bg-slate-50">
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}

export default LayoutMain;
