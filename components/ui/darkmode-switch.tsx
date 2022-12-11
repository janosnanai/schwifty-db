import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { useIsMounted } from "../../lib/hooks";

enum Themes {
  DARK = "dark",
  LIGHT = "light",
}

function DarkModeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
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
      aria-hidden
      checked={resolvedTheme === Themes.DARK}
      onChange={handleToggle}
      className={`${
        resolvedTheme === Themes.DARK ? "bg-zinc-700" : "bg-zinc-500"
      } relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <MoonIcon className="absolute left-0.5 h-6 w-6 text-emerald-300" />
      <SunIcon className="absolute right-0.5 h-6 w-6 text-emerald-300" />
      <span
        className={`${
          resolvedTheme === Themes.DARK ? "translate-x-8" : "translate-x-0"
        } pointer-events-none inline-block h-6 w-6 transform rounded-full bg-zinc-200 shadow-md ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}

export default DarkModeSwitch;
