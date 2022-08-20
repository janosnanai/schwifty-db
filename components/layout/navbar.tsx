import Link from "next/link";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";

import { useIsMounted } from "../../lib/hooks";

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
        <DarkToggle />
      </div>
    </nav>
  );
}

import { MoonIcon, SunIcon } from "@heroicons/react/outline";

enum Themes {
  DARK = "dark",
  LIGHT = "light",
}

function DarkToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  function handleToggle() {
    switch (resolvedTheme) {
      case Themes.DARK:
        setTheme(Themes.LIGHT);
        break;
      case Themes.LIGHT:
        setTheme(Themes.DARK);
        break;
      default:
        return;
    }
  }

  if (!isMounted) return null;

  return (
    <Switch
      checked={resolvedTheme === Themes.DARK}
      onChange={handleToggle}
      className={`${
        theme === Themes.DARK ? "bg-slate-700" : "bg-slate-500"
      } relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <MoonIcon className="absolute left-0.5 h-6 w-6 text-emerald-300" />
      <SunIcon className="absolute right-0.5 h-6 w-6 text-emerald-300" />
      <span
        className={`${
          theme === Themes.DARK ? "translate-x-8" : "translate-x-0"
        } pointer-events-none inline-block h-6 w-6 transform rounded-full bg-slate-200 shadow-md ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}

export default Navbar;
