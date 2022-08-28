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
    <div className="rounded-lg bg-white/75 dark:bg-black/75 border dark:border-zinc-700 backdrop-blur w-64 shadow overflow-hidden">
      <div className="flex justify-between px-6 py-3 bg-gradient-to-tr from-purple-600/50 to-transparent mb-2">
        <h2 className="text-2xl text-zinc-800 dark:text-zinc-300">Filters</h2>

        <button
          type="button"
          disabled={!filterIsActive}
          className="relative h-9 w-11 rounded bg-red-500 hover:enabled:bg-red-400 disabled:bg-slate-500 text-zinc-900"
          onClick={() => {
            onReset();
          }}
        >
          <FunnelIcon className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 mr-[1px] w-6 h-6" />
          <XMarkIcon className="absolute bottom-1 right-1.5 w-4 h-4" />
        </button>
      </div>

      <div className="mx-6 mb-24">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">{children}</div>
        </form>
      </div>
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
        className="px-2 py-1 rounded-lg bg-zinc-900 w-full text-zinc-300 placeholder:text-zinc-500 border border-zinc-700"
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
      <Listbox.Label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{`${name}:`}</Listbox.Label>
      <div className="relative">
        <Listbox.Button className="relative text-left w-full cursor-default p-2 py-1 pr-10 rounded-lg bg-zinc-900 border border-zinc-700">
          <span
            className={`block truncate text-zinc-500 ${
              value && "text-zinc-300"
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
          <Listbox.Options className="absolute top-0 w-full overflow-auto bg-zinc-900 cursor-default rounded-lg z-10 border border-zinc-700">
            <Listbox.Option value={""} className="relative group">
              {({ selected }) => (
                <div className="px-2 py-0.5 hover:bg-zinc-800">
                  <span className="pr-7 text-zinc-300 group-hover:text-emerald-300">
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
                  <div className="px-2 py-0.5 hover:bg-zinc-800">
                    <span className="pr-7 text-zinc-300 group-hover:text-emerald-300">
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
