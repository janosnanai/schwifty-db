import Link from "next/link";

import DarkModeSwitch from "./darkmode-switch";

function Navbar() {
  return (
    <nav className="px-12 py-3 w-full h-16 bg-zinc-50/75 dark:bg-zinc-900/75 backdrop-blur">
      <div className="flex justify-between items-center">
        <div className="flex gap-7">
          <div>
            <Link href="/">
              <a className="font-bold text-3xl text-zinc-800 dark:text-zinc-100">
                schwiftyDB
              </a>
            </Link>
          </div>
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
        </div>
        <DarkModeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
