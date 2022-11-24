import type { ReactNode } from "react";

import Link from "next/link";

import { FALLBACK_PROP_TEXT } from "../../lib/constants";

function SingleEntityDataListRoot({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={
        className +
        " " +
        "w-[300px] min-h-[300px] max-h-min bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden shadow"
      }
    >
      <h2 className="font-dosis uppercase bg-zinc-200 dark:bg-zinc-900/50 p-2 border-b border-purple-500">
        {label}
      </h2>
      <ul className="p-2 space-y-3">{children}</ul>
    </div>
  );
}

function Item({
  label,
  content = null,
  link = null,
}: {
  label: string;
  content?: string | null;
  link?: string | null;
}) {
  return (
    <li className="flex items-top py-1">
      <h2 className="font-dosis text-xs text-zinc-700 dark:text-zinc-400 uppercase w-16 pr-2 mt-1">
        {label}
      </h2>
      {!link && (
        <p className="font-domine text-zinc-900 dark:text-zinc-200 w-[220px] pl-2">
          {content || FALLBACK_PROP_TEXT}
        </p>
      )}
      {link && (
        <Link href={link}>
          <a>
            <p className="font-domine text-emerald-800 dark:text-emerald-300 w-[220px] pl-2 hover:underline underline-offset-2">
              {content}
            </p>
          </a>
        </Link>
      )}
    </li>
  );
}

export const SingleEntityDataList = Object.assign(SingleEntityDataListRoot, {
  Item,
});
