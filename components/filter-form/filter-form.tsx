import type { FormEvent } from "react";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function FilterFormRoot({
  setFilter,
  onReset,
  filterIsActive = false,
  allResults = 0,
  loadedResults = 0,
  children,
}: {
  setFilter: () => void;
  onReset: () => void;
  filterIsActive: boolean;
  allResults?: number;
  loadedResults?: number;
  children: JSX.Element | JSX.Element[];
}) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFilter();
  }

  return (
    <div className="px-6 py-3 rounded-lg bg-white/75 dark:bg-black/75 border-2 border-purple-500/75 backdrop-blur w-64 shadow">
      <p className="text-sm text-emerald-500">{`${allResults} results / ${loadedResults} loaded`}</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">{children}</div>
      </form>
      <button
        type="button"
        disabled={!filterIsActive}
        className="relative h-8 w-full mt-9 rounded-lg bg-red-500 hover:enabled:bg-red-400 disabled:bg-slate-500 text-zinc-900 font-semibold disabled:text-slate-800"
        onClick={() => {
          onReset();
        }}
      >
        <FunnelIcon className="absolute bottom-1/2 left-2 translate-y-1/2 mr-[1px] w-5 h-5" />
        <XMarkIcon className="absolute bottom-0.5 left-5 w-3 h-3" />
        clear filters
      </button>
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
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-zinc-600 dark:text-zinc-400"
      >
        {`${name}:`}
      </label>
      <input
        id={name}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="px-2 py-1 rounded-lg bg-zinc-300 dark:bg-zinc-900 w-full text-zinc-800 dark:text-zinc-300 font-semibold placeholder:font-normal placeholder:text-zinc-500 border border-zinc-500 dark:border-zinc-700"
        value={value || ""}
        placeholder={`enter ${name} filter...`}
      />
    </div>
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
      as={Fragment}
      value={value}
      onChange={(value) => {
        onChange(value);
      }}
    >
      <div className="relative">
        <Listbox.Label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{`${name}:`}</Listbox.Label>
        <Listbox.Button className="relative text-left w-full cursor-default px-2 py-1 pr-10 rounded-lg bg-zinc-300 dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-700">
          <span
            className={`block truncate text-zinc-500 ${
              value && "font-semibold text-zinc-800 dark:text-zinc-300"
            }`}
          >
            {value || `select ${name} filter...`}
          </span>
          <span className="pointer-events-none absolute bottom-1/2 translate-y-1/2 right-0">
            <ChevronUpDownIcon className="w-6 h-6" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute top-6 w-full overflow-auto bg-zinc-300 dark:bg-zinc-900 cursor-default rounded-lg z-10 border border-zinc-500 dark:border-zinc-700">
            <Listbox.Option value={""} className="relative group">
              {({ selected }) => (
                <div className="px-2 py-0.5 hover:bg-zinc-500 dark:hover:bg-zinc-800">
                  <span className="pr-7 text-zinc-800 dark:text-zinc-300 group-hover:text-emerald-300">
                    {"-"}
                  </span>
                  {selected && (
                    <CheckIcon className="absolute right-2 bottom-0.5 w-5 h-5" />
                  )}
                </div>
              )}
            </Listbox.Option>
            {options?.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className="relative group"
              >
                {({ selected }) => (
                  <div className="px-2 py-0.5 hover:bg-zinc-500 dark:hover:bg-zinc-800">
                    <span className="pr-7 text-zinc-800 dark:text-zinc-300 group-hover:text-emerald-300">
                      {option.value}
                    </span>
                    {selected && (
                      <CheckIcon className="absolute right-2 bottom-0.5 w-5 h-5" />
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export const FilterForm = Object.assign(FilterFormRoot, {
  Input,
  Select,
});
