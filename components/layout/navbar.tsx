import Link from "next/link";

import DarkModeSwitch from "../ui/darkmode-switch";

function Navbar() {
  return (
    <nav className="px-12 py-3 w-full h-16 bg-slate-200 bg-opacity-90">
      <div className="flex justify-between items-center">
        <div className="flex gap-7">
          <div>
            <Link href="/">
              <a className="font-bold text-3xl text-slate-800">schwiftyDB</a>
            </Link>
          </div>
          <div className="flex text-xl text-slate-600">
            <Link href="/characters">
              <a className="hover:text-slate-900 hover:bg-white hover:bg-opacity-75 px-2 py-0.5 transition rounded-xl">
                characters
              </a>
            </Link>
            <Link href="/locations">
              <a className="hover:text-slate-900 hover:bg-white hover:bg-opacity-75 px-2 py-0.5 transition rounded-xl">
                locations
              </a>
            </Link>
            <Link href="/episodes">
              <a className="hover:text-slate-900 hover:bg-white hover:bg-opacity-75 px-2 py-0.5 transition rounded-xl">
                episodes
              </a>
            </Link>
            <div className="my-1 mx-1 w-0.5 bg-slate-300"></div>
            <Link href={"/about"}>
              <a className="hover:text-slate-900 hover:bg-white hover:bg-opacity-75 px-2 py-0.5 transition rounded-xl">
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
