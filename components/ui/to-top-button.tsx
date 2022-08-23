import { ChevronDoubleUpIcon } from "@heroicons/react/outline";

function ToTopButton({ className }: { className?: string }) {
  return (
    <div className={`w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 ${className}`}>
      <a href="#page-top">
        <ChevronDoubleUpIcon className="w-6 h-6 mx-auto mt-[9px] text-slate-800" />
      </a>
    </div>
  );
}

export default ToTopButton;
