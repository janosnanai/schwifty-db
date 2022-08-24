import type { FormEvent, ReactNode } from "react";

import { FilterIcon, XIcon } from "@heroicons/react/outline";

function FilterMenu({
  onSubmit,
  onReset,
  filterIsActive = false,
  children,
}: {
  onSubmit: (event: FormEvent) => void;
  onReset: () => void;
  filterIsActive: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative px-9 pt-4 pb-6 rounded-lg text-emerald-300 bg-slate-100/75 dark:bg-slate-900/90 w-72">
      <h2 className="text-2xl mb-3">Filters</h2>
      {filterIsActive && (
        <div className="absolute bottom-3 right-2">
          <button
            type="button"
            className="relative h-11 w-11 rounded-full bg-red-500 hover:bg-red-400 text-slate-900"
            onClick={onReset}
          >
            <FilterIcon className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 mr-[1px] w-6 h-6" />
            <XIcon className="absolute bottom-1.5 right-1.5 w-4 h-4" />
          </button>
        </div>
      )}
      <form onSubmit={onSubmit} className="mb-12">
        <div className="flex flex-col gap-2">{children}</div>
      </form>
    </div>
  );
}

export default FilterMenu;
