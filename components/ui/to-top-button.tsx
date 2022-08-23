import { ChevronDoubleUpIcon } from "@heroicons/react/outline";

function ToTopButton({ className }: { className?: string }) {
  return (
    <a href="#page-top">
      <div
        className={`w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 ${className}`}
      >
        <ChevronDoubleUpIcon className="w-6 h-6 mx-auto mt-[9px] text-slate-800" />
      </div>
    </a>
  );
}

export default ToTopButton;
