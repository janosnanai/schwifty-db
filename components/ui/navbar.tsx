import Link from "next/link";

import { useEffect, useState } from "react";

import DarkModeSwitch from "./darkmode-switch";
import HamburgerButton from "./hamburger-button";

function Navbar() {
  const [hamburgerMode, setHamburgerMode] = useState(false);
  const hamburgerModeBreakpoint = 768;

  function handleWindowResize(vw: number) {
    if (vw < hamburgerModeBreakpoint) {
      setHamburgerMode(true);
    } else {
      setHamburgerMode(false);
    }
  }

  useEffect(() => {
    const resizeListenerController = new AbortController();
    const signal = resizeListenerController.signal;

    if (window.innerWidth < hamburgerModeBreakpoint) setHamburgerMode(true);

    window.addEventListener(
      "resize",
      () => handleWindowResize(window.innerWidth),
      { signal }
    );

    return () => resizeListenerController.abort();
  }, []);

  return (
    <nav className="px-12 py-3 w-full h-20 bg-zinc-50/75 dark:bg-zinc-900/75 backdrop-blur">
      <div className="flex justify-between items-center">
        <div className="flex gap-7 ">
          <div>
            <Link href="/">
              <a className="font-bold text-3xl text-zinc-800 dark:text-zinc-100">
                schwiftyDB
              </a>
            </Link>
          </div>
          {!hamburgerMode && (
            <div className="flex text-xl text-zinc-500">
              <Link href="/characters">
                <a className="hover:text-zinc-800 hover:dark:text-zinc-300 px-2 py-0.5 transition">
                  characters
                </a>
              </Link>
              <Link href="/locations">
                <a className="hover:text-zinc-800 hover:dark:text-zinc-300 px-2 py-0.5 transition">
                  locations
                </a>
              </Link>
              <Link href="/episodes">
                <a className="hover:text-zinc-800 hover:dark:text-zinc-300 px-2 py-0.5 transition">
                  episodes
                </a>
              </Link>
              <div className="my-1 mx-1 w-0.5 bg-zinc-300 dark:bg-zinc-600"></div>
              <Link href={"/about"}>
                <a className="hover:text-zinc-800 hover:dark:text-zinc-300 px-2 py-0.5 transition">
                  about
                </a>
              </Link>
            </div>
          )}
        </div>
        {!hamburgerMode && <DarkModeSwitch />}
        {hamburgerMode && <HamburgerButton />}
      </div>
    </nav>
  );
}

export default Navbar;
