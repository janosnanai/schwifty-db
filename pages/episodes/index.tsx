import type { NextPage } from "next";
import type { GetManyEpisodesQuery } from "../../graphql/_generated";
import type { FilterEpisode } from "../../graphql/_generated";

import Head from "next/head";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";

import EpisodeCardList from "../../components/card/episode-card-list";
import EpisodesFilterForm from "../../components/filter-form/episodes-filter-form";
import ErrorBanner from "../../components/ui/error-banner";
import FilterPopover from "../../components/ui/filter-popover";
import ToTopButton from "../../components/ui/to-top-button";
import LayoutMain from "../../components/layout/layout-main";
import {
  episodesFilterGetterAtom,
  episodesFilterActiveAtom,
  loadingSpinnerSetterAtom,
  errorBannerMessageSetterAtom,
  errorBannerShowSetterAtom,
} from "../../lib/atoms";
import { getManyEpisodesQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll, useIntersectionObserver } from "../../lib/hooks";

const EpisodesPage: NextPage = () => {
  const [episodesFilter] = useAtom(episodesFilterGetterAtom);
  const [filterIsActive] = useAtom(episodesFilterActiveAtom);
  const [, setIsLoading] = useAtom(loadingSpinnerSetterAtom);
  const [, setErrorMessage] = useAtom(errorBannerMessageSetterAtom);
  const [, setErrorShow] = useAtom(errorBannerShowSetterAtom);

  const {
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    data,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<
    GetManyEpisodesQuery,
    Error | null,
    GetManyEpisodesQuery,
    (string | FilterEpisode)[]
  >(
    ["episodes", episodesFilter],
    ({ pageParam }) => {
      return getManyEpisodesQueryFn(pageParam, episodesFilter);
    },
    {
      getNextPageParam: (lastPage, _pages) => lastPage.episodes?.info?.next,
    }
  );

  useEffect(() => {
    setErrorShow(isError);
    setErrorMessage(error ? error.message : "");
  }, [isError, error, setErrorShow, setErrorMessage]);

  useEffect(() => {
    setIsLoading(isLoading || isFetching);
  }, [isLoading, isFetching, setIsLoading]);

  const bottomRef = useInfiniteScroll(
    () => fetchNextPage({ cancelRefetch: false }),
    hasNextPage
  );

  const { observedRef: topRef, isVisible: isTopVisible } =
    useIntersectionObserver();

  return (
    <>
      <Head>
        <title>schwiftyDB - episodes</title>
        <meta
          name="description"
          content="Browse, search and filter between all Rick and Morty episodes."
        />
      </Head>
      <LayoutMain>
        <ErrorBanner refetch={refetch} />
        <ToTopButton
          className="fixed bottom-20 md:bottom-24 right-3 md:right-10 z-10"
          show={!isTopVisible}
        />
        <FilterPopover
          className="fixed bottom-6 md:bottom-10 right-3 md:right-10 z-10"
          active={filterIsActive}
        >
          <EpisodesFilterForm
            allResults={data?.pages[0].episodes?.info?.count || 0}
            loadedResults={Math.min(
              (data?.pages.length || 0) * 20,
              data?.pages[0].episodes?.info?.count || 0
            )}
          />
        </FilterPopover>
        <h1 className="font-heading text-4xl text-center text-zinc-800 dark:text-zinc-100 mb-7 uppercase">
          episodes
        </h1>
        <div className="mx-14 md:mx-24 xl:mx-40">
          <EpisodeCardList
            pages={data?.pages}
            topRef={topRef}
            bottomRef={bottomRef}
          />
          <div className="mx-auto my-3 text-center">
            {hasNextPage && (isLoading || isFetching) && <p>loading more...</p>}
            {!hasNextPage &&
              !(isLoading || isFetching) &&
              !!data?.pages[0].episodes?.results?.length && (
                <p>end of results</p>
              )}
            {!hasNextPage &&
              !(isLoading || isFetching) &&
              !data?.pages[0].episodes?.results?.length && (
                <p>no results found</p>
              )}
          </div>
        </div>
      </LayoutMain>
    </>
  );
};

export default EpisodesPage;
