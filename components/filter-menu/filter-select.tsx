import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";

function FilterSelect({
  name,
  onChange,
  value,
  options,
}: {
  name: string;
  onChange: (value: string) => void;
  value?: string | null;
  options?: { name?: string; value: string }[];
}) {
  return (
    <Listbox value={value} onChange={onChange}>
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

export default FilterSelect;
