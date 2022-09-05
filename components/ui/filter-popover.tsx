import type { ReactNode } from "react";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";

function FilterPopover({
  children,
  className,
  active,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <Popover className={className}>
      {({ open }) => (
        <>
          <Popover.Button className="relative h-11 w-11 rounded-full transition-colors bg-purple-500  hover:bg-purple-400">
            <Transition
              show={active}
              as={Fragment}
              enter="transition ease-in"
              enterFrom="opacity-0 scale-0"
              enterTo="opacity-100 scale-100"
              leave="transition ease-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-0"
            >
              <span className="absolute top-0.5 right-0 inline-block w-2.5 h-2.5 rounded-full border bg-amber-400 dark:bg-amber-300 border-amber-500  dark:border-amber-200"></span>
            </Transition>
            <FunnelIcon
              className={`w-6 h-6 mx-auto mt-1 transition-colors ${
                open ? "text-emerald-300" : "text-slate-900"
              }`}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-20"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-20"
          >
            <Popover.Panel className="fixed bottom-7 right-24">
              {children}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default FilterPopover;
