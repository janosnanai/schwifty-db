import type { NextPage } from "next";

import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

import EpisodeCardList from "../../components/card/episode-card-list";
import EpisodesFilterForm from "../../components/filter-form/episodes-filter-form";
import FilterPopover from "../../components/ui/filter-popover";
import ToTopButton from "../../components/ui/to-top-button";
import LayoutQuery from "../../components/layout/layout-query";
import {
  episodesFilterGetterAtom,
  episodesFilterActiveAtom,
} from "../../lib/atoms";
import { getManyEpisodesQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll, useIntersectionObserver } from "../../lib/hooks";

const EpisodesPage: NextPage = () => {
  const [episodesFilter] = useAtom(episodesFilterGetterAtom);

  const [filterIsActive] = useAtom(episodesFilterActiveAtom);

  const { isLoading, isFetching, isError, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery(
      ["episodes", episodesFilter],
      ({ pageParam }) => {
        return getManyEpisodesQueryFn(pageParam, episodesFilter);
      },
      {
        getNextPageParam: (lastPage, _pages) => lastPage.episodes?.info?.next,
      }
    );

  const bottomRef = useInfiniteScroll(
    () => fetchNextPage({ cancelRefetch: false }),
    hasNextPage
  );

  const { observedRef: topRef, isVisible: isTopVisible } =
    useIntersectionObserver(isFetching);

  return (
    <LayoutQuery>
      <ToTopButton className="fixed bottom-24 right-10" show={!isTopVisible} />
      <FilterPopover
        className="fixed bottom-10 right-10 z-10"
        active={filterIsActive}
      >
        <EpisodesFilterForm />
      </FilterPopover>
      <h1>episodes page</h1>
      <div className="px-36">
        <EpisodeCardList
          pages={data?.pages}
          topRef={topRef}
          bottomRef={bottomRef}
        />
        <div className="mx-auto my-3 text-center">
          <PulseLoader
            size={15}
            speedMultiplier={1.2}
            loading={isLoading || isFetching}
          />
          {!hasNextPage && !(isLoading || isFetching) && <p>end of results</p>}
        </div>
      </div>
    </LayoutQuery>
  );
};

export default EpisodesPage;
