import Link from "next/link";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { ScaleLoader } from "react-spinners";

import DarkModeSwitch from "./darkmode-switch";
import HamburgerButton from "./hamburger-button";
import { loadingSpinnerGetterAtom } from "../../lib/atoms";

function Navbar() {
  const [hamburgerMode, setHamburgerMode] = useState(false);
  const hamburgerModeBreakpoint = 768;
  const [isLoading] = useAtom(loadingSpinnerGetterAtom);

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
    <nav className="relative px-12 py-4 w-full h-20 bg-zinc-50/75 dark:bg-zinc-900/75 backdrop-blur">
      <div className="fixed top-4 left-1">
        <ScaleLoader
          loading={isLoading}
          color="#cc5de8"
          height={35}
          speedMultiplier={2}
          width={3}
        />
      </div>
      <div className="flex justify-between h-10 items-center">
        <div className="flex gap-7 items-center">
          <div>
            <Link
              href="/"
              className="font-bold font-dosis text-5xl text-zinc-800 dark:text-zinc-100"
            >
              schwiftyDB
            </Link>
          </div>
          {!hamburgerMode && (
            <div className="flex text-lg uppercase text-zinc-500">
              <Link
                href="/characters"
                className="font-dosis text-2xl hover:text-zinc-800 hover:dark:text-zinc-300 mx-2 my-0.5 transition"
              >
                characters
              </Link>
              <Link
                href="/locations"
                className="font-dosis text-2xl hover:text-zinc-800 hover:dark:text-zinc-300 mx-2 my-0.5 transition"
              >
                locations
              </Link>
              <Link
                href="/episodes"
                className="font-dosis text-2xl hover:text-zinc-800 hover:dark:text-zinc-300 mx-2 my-0.5 transition"
              >
                episodes
              </Link>
              <div className="my-1 mx-1 w-0.5 bg-zinc-300 dark:bg-zinc-600"></div>
              <Link
                href="/about"
                className="font-dosis text-2xl hover:text-zinc-800 hover:dark:text-zinc-300 mx-2 my-0.5 transition"
              >
                about
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
