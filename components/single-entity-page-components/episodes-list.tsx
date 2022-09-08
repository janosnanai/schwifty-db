import type { EpisodeCoreFragment } from "../../graphql/_generated";

import Link from "next/link";

function EpisodesList({
  label,
  list,
  linkRoot,
  className,
}: {
  label: string;
  list?: (EpisodeCoreFragment | null)[] | null;
  linkRoot?: string;
  className?: string;
}) {
  return (
    <div
      className={
        className +
        " " +
        "bg-zinc-100 dark:bg-zinc-800 rounded-lg min-h-[300px] max-h-[432px] w-[300px] sm:w-[608px] overflow-hidden flex flex-col justify-start shadow"
      }
    >
      <h2 className="bg-zinc-200 dark:bg-zinc-900/50 p-2 border-b border-purple-500">
        <span className="uppercase text-zinc-900 dark:text-zinc-200">
          {label}
        </span>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">{`(${
          list?.length ?? 0
        })`}</span>
      </h2>
      {list && (
        <ul className="overflow-y-auto space-y-2 p-2">
          {list.map(
            (item) =>
              item && (
                //eslint bug?
                //eslint-disable-next-line
                <li key={"e" + item.id}>
                  <Link href={`${linkRoot}${item?.id}`}>
                    <a className="group inline-flex gap-2 w-full">
                      <p className="text-emerald-800 dark:text-emerald-300 group-hover:underline underline-offset-2">
                        {item?.episode}
                      </p>
                      <p className="text-emerald-600 dark:text-emerald-400 group-hover:underline underline-offset-2 truncate">
                        {item?.name}
                      </p>
                    </a>
                  </Link>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}

export default EpisodesList;
