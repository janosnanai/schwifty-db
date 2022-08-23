import { ReactNode } from "react";

import { Popover } from "@headlessui/react";
import { FilterIcon } from "@heroicons/react/outline";

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
          <Popover.Button className="realtive h-11 w-11 rounded-full bg-purple-500  hover:bg-purple-400">
            {active && <span className="absolute top-0.5 right-0 inline-block w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-400"></span>}
            <FilterIcon
              className={`w-6 h-6 mx-auto mt-1.5 ${
                open ? "text-emerald-300" : "text-slate-800"
              }`}
            />
          </Popover.Button>
          <Popover.Panel className="fixed bottom-7 right-24">
            {children}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

export default FilterPopover;
