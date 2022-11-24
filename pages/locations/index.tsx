import type { NextPage } from "next";
import type { GetManyLocationsQuery } from "../../graphql/_generated";
import type { FilterLocation } from "../../graphql/_generated";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";

import LocationCardList from "../../components/card/location-card-list";
import LocationFilterForm from "../../components/filter-form/locations-filter-form";
import ErrorBanner from "../../components/ui/error-banner";
import FilterPopover from "../../components/ui/filter-popover";
import ToTopButton from "../../components/ui/to-top-button";
import LayoutQuery from "../../components/layout/layout-query";
import {
  locationsFilterGetterAtom,
  locationsFilterActiveAtom,
  loadingSpinnerSetterAtom,
  errorBannerMessageSetterAtom,
  errorBannerShowSetterAtom,
} from "../../lib/atoms";
import { getManyLocationsQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll, useIntersectionObserver } from "../../lib/hooks";

const LocationsPage: NextPage = () => {
  const [locationsFilter] = useAtom(locationsFilterGetterAtom);
  const [filterIsActive] = useAtom(locationsFilterActiveAtom);
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
    GetManyLocationsQuery,
    Error | null,
    GetManyLocationsQuery,
    (string | FilterLocation)[]
  >(
    ["episodes", locationsFilter],
    ({ pageParam }) => {
      return getManyLocationsQueryFn(pageParam, locationsFilter);
    },
    {
      getNextPageParam: (lastPage, _pages) => lastPage.locations?.info?.next,
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
    <LayoutQuery>
      <ErrorBanner refetch={refetch} />
      <ToTopButton
        className="fixed bottom-20 md:bottom-24 right-3 md:right-10 z-10"
        show={!isTopVisible}
      />
      <FilterPopover
        className="fixed bottom-6 md:bottom-10 right-3 md:right-10 z-10"
        active={filterIsActive}
      >
        <LocationFilterForm
          allResults={data?.pages[0].locations?.info?.count || 0}
          loadedResults={Math.min(
            (data?.pages.length || 0) * 20,
            data?.pages[0].locations?.info?.count || 0
          )}
        />
      </FilterPopover>
      <h1 className="font-dosis text-4xl text-center text-zinc-800 dark:text-zinc-100 mb-7 uppercase">
        locations
      </h1>
      <div className="mx-14 md:mx-24 xl:mx-40">
        <LocationCardList
          pages={data?.pages}
          topRef={topRef}
          bottomRef={bottomRef}
        />
        <div className="mx-auto my-3 text-center">
          {hasNextPage && (isLoading || isFetching) && <p>loading more...</p>}
          {!hasNextPage &&
            !(isLoading || isFetching) &&
            !!data?.pages[0].locations?.results?.length && (
              <p>end of results</p>
            )}
          {!hasNextPage &&
            !(isLoading || isFetching) &&
            !data?.pages[0].locations?.results?.length && (
              <p>no results found</p>
            )}
        </div>
      </div>
    </LayoutQuery>
  );
};

export default LocationsPage;
