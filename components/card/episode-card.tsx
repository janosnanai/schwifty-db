import type { RefObject } from "react";
import type { EpisodeCardFragment } from "../../graphql/_generated";

import Link from "next/link";
import { FilmIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const FALLBACK_PROP_TEXT = "unknown";

function EpisodeCard({
  episode,
  cardRef = null,
}: {
  episode: EpisodeCardFragment;
  cardRef?: RefObject<any> | null;
}) {
  return (
    <Link href={`/episodes/${episode.id}`}>
      <a
        ref={cardRef}
        className="group m-1.5 border-0 rounded-lg shadow shadow-emerald-400/50 border-emerald-400 hover:shadow-lg hover:m-1 hover:border-2 hover:shadow-emerald-400/30 transition ease-out overflow-hidden"
      >
        <article className="flex flex-col justify-between bg-zinc-100 dark:bg-zinc-800 h-48 w-60">
          <div className="flex flex-col justify-center h-1/2 w-full px-2 py-0 shadow-sm bg-zinc-300 group-hover:bg-zinc-200 dark:bg-black/50 dark:group-hover:bg-zinc-900/50 transition ease-out">
            <h2 className="inline-block text-purple-800 dark:text-purple-500 text-2xl font-bold tracking-tight leading-tight">
              {episode.name}
            </h2>
          </div>
          <div className="flex items-center h-12 px-2 py-1 gap-2 text-sm text-zinc-700 dark:text-zinc-300 tracking-wide">
            <div className="border-r-2 border-zinc-300 dark:border-zinc-700 pr-2">
              <FilmIcon className="w-6 h-6 text-purple-400" />
            </div>
            <p>{episode.episode || FALLBACK_PROP_TEXT}</p>
          </div>
          <div className="flex items-center h-12 px-2 py-1 gap-2 text-sm text-zinc-700 dark:text-zinc-300 tracking-wide">
            <div className="border-r-2 border-zinc-300 dark:border-zinc-700 pr-2">
              <CalendarDaysIcon className="w-6 h-6 text-purple-400" />
            </div>
            <p>{episode.air_date || FALLBACK_PROP_TEXT}</p>
          </div>
        </article>
      </a>
    </Link>
  );
}

export default EpisodeCard;
