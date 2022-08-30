import type { RefObject } from "react";
import type { Episode, GetManyEpisodesQuery } from "../../graphql/_generated";

import EpisodeCard from "./episode-card";

function EpisodeCardList({
  pages,
  topRef = null,
  bottomRef = null,
}: {
  pages: GetManyEpisodesQuery[] | undefined;
  topRef?: RefObject<any> | null;
  bottomRef?: RefObject<any> | null;
}) {
  const allEpisodes: Episode[] = [];
  pages?.forEach((page) => {
    if (!page.episodes?.results) return;
    const currentEpisodes = page.episodes.results as Episode[];
    allEpisodes.push(...currentEpisodes);
  });

  return (
    <div className="flex flex-wrap justify-center">
      {allEpisodes.map((episode, idx) => {
        let cardRef = null;
        if (idx === 0) {
          cardRef = topRef;
        }
        if (idx === allEpisodes.length - 1) {
          cardRef = bottomRef;
        }
        return (
          <EpisodeCard
            key={"e" + episode!.id}
            episode={episode!}
            cardRef={cardRef}
          />
        );
      })}
    </div>
  );
}

export default EpisodeCardList;
