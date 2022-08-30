import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

function ToTopButton({
  className,
  show = true,
  topId = "page-top",
}: {
  className?: string;
  show?: boolean;
  topId?: string;
}) {
  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition-opacity ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <a href={`#${topId}`}>
        <div
          className={`w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 ${className}`}
        >
          <ChevronDoubleUpIcon className="w-6 h-6 mx-auto mt-[9px] text-slate-900" />
        </div>
      </a>
    </Transition>
  );
}

export default ToTopButton;
