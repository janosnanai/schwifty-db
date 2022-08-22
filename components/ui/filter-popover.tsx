import { ReactNode } from "react";

import { Popover } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/outline";

function FilterPopover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Popover className={className}>
      {({ open }) => (
        <>
          <Popover.Button className="h-11 w-[70px] px-2.5 rounded-full bg-purple-500 text-slate-800 hover:text-emerald-300">
            <div className="flex justify-between items-center mt-0.5">
              <FilterIcon className="w-6 h-6" />
              <ChevronDownIcon
                className={`w-6 h-6 ${open ? "rotate-180" : ""}`}
              />
            </div>
          </Popover.Button>
          <Popover.Panel className="fixed bottom-24 right-7">
            {children}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

export default FilterPopover;
