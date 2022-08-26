import { FormEvent } from "react";

import { Listbox } from "@headlessui/react";
import {
  CheckIcon,
  FilterIcon,
  SelectorIcon,
  XIcon,
} from "@heroicons/react/outline";

function FilterFormRoot({
  setFilter,
  onReset,
  filterIsActive = false,
  children,
}: {
  setFilter: () => void;
  onReset: () => void;
  filterIsActive: boolean;
  children: JSX.Element | JSX.Element[];
}) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFilter();
  }

  return (
    <div className="relative px-9 pt-4 pb-6 rounded-lg text-emerald-300 bg-slate-100/75 dark:bg-slate-900/90 w-72">
      <h2 className="text-2xl mb-3">Filters</h2>
      {filterIsActive && (
        <div className="absolute bottom-3 right-2">
          <button
            type="button"
            className="relative h-11 w-11 rounded-full bg-red-500 hover:bg-red-400 text-slate-900"
            onClick={() => {
              onReset();
            }}
          >
            <FilterIcon className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 mr-[1px] w-6 h-6" />
            <XIcon className="absolute bottom-1.5 right-1.5 w-4 h-4" />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex flex-col gap-2">{children}</div>
      </form>
    </div>
  );
}

function Input({
  name,
  onChange,
  value,
}: {
  name: string;
  onChange: (value: string) => void;
  value?: string | null;
}) {
  return (
    <input
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className="px-2 py-1 rounded-lg bg-slate-700"
      value={value || ""}
      placeholder={`filter by ${name}...`}
    />
  );
}

function Select({
  name,
  onChange,
  value,
  options,
}: {
  name: string;
  onChange: (value?: string | null) => void;
  value?: string | null;
  options?: { name?: string; value: string }[];
}) {
  return (
    <Listbox
      value={value}
      onChange={(value) => {
        onChange(value);
      }}
    >
      <Listbox.Button className="relative w-full cursor-default p-2 py-1 pr-10 rounded-lg bg-slate-700">
        <span className="block truncate">{value || `--select ${name}--`}</span>
        <span className="pointer-events-none absolute bottom-1/2 translate-y-1/2 right-0">
          <SelectorIcon className="w-6 h-6" />
        </span>
      </Listbox.Button>
      <Listbox.Options className="px-2 py-1 overflow-auto bg-slate-800 cursor-default">
        <>
          <Listbox.Option value={""} className="relative">
            {({ selected }) => (
              <>
                <span className="pl-7">{"-"}</span>
                {selected && (
                  <CheckIcon className="absolute left-0 bottom-0 w-5 h-5" />
                )}
              </>
            )}
          </Listbox.Option>
          {options?.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className="relative"
            >
              {({ selected }) => (
                <>
                  <span className="pl-7">{option.value}</span>
                  {selected && (
                    <CheckIcon className="absolute left-0 bottom-0 w-5 h-5" />
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </>
      </Listbox.Options>
    </Listbox>
  );
}

export const FilterForm = Object.assign(FilterFormRoot, {
  Input,
  Select,
});
