import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import DarkModeSwitch from "./darkmode-switch";

function HamburgerButton() {
  const basicBurgerLineStyle =
    "absolute left-1/2 top-1/2 -translate-x-1/2 h-0.5 w-7 rounded-full bg-black dark:bg-zinc-500 dark:group-hover:bg-zinc-300 transition ease-out transform duration-200";

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={`relative h-12 w-12 group z-10 transition duration-200 ${
              open ? "ease-out -translate-x-11" : "ease-in duration-150"
            }`}
          >
            <span
              className={`${basicBurgerLineStyle} ${
                open ? "rotate-45" : "translate-y-2.5"
              }`}
            ></span>
            <span
              className={`${basicBurgerLineStyle} ${open ? "scale-x-0" : ""}`}
            ></span>
            <span
              className={`${basicBurgerLineStyle} ${
                open ? "-rotate-45" : "-translate-y-2.5"
              }`}
            ></span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-20"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-20"
          >
            <Popover.Panel className="fixed right-0 top-0">
              <div className="w-40 p-5 pt-24 flex flex-col text-xl text-zinc-500 bg-zinc-50 dark:bg-zinc-900">
                <Link
                  href="/characters"
                  className="hover:text-zinc-800 hover:dark:text-zinc-300 px-3 py-1 transition"
                >
                  characters
                </Link>
                <Link
                  href="/locations"
                  className="hover:text-zinc-800 hover:dark:text-zinc-300 px-3 py-1 transition"
                >
                  locations
                </Link>
                <Link
                  href="/episodes"
                  className="hover:text-zinc-800 hover:dark:text-zinc-300 px-3 py-1 transition"
                >
                  episodes
                </Link>
                <div className="mt-9 mx-auto">
                  <DarkModeSwitch />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default HamburgerButton;
