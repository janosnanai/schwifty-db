import type { NextPage } from "next";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";

import LocationCardList from "../../components/card/location-card-list";
import LocationFilterForm from "../../components/filter-form/locations-filter-form";
import FilterPopover from "../../components/ui/filter-popover";
import ToTopButton from "../../components/ui/to-top-button";
import LayoutQuery from "../../components/layout/layout-query";
import {
  locationsFilterGetterAtom,
  locationsFilterActiveAtom,
  loadingSpinnerSetterAtom,
} from "../../lib/atoms";
import { getManyLocationsQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll, useIntersectionObserver } from "../../lib/hooks";

const LocationsPage: NextPage = () => {
  const [locationsFilter] = useAtom(locationsFilterGetterAtom);
  const [filterIsActive] = useAtom(locationsFilterActiveAtom);
  const [, setIsLoading] = useAtom(loadingSpinnerSetterAtom);

  const { isLoading, isFetching, isError, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery(
      ["episodes", locationsFilter],
      ({ pageParam }) => {
        return getManyLocationsQueryFn(pageParam, locationsFilter);
      },
      {
        getNextPageParam: (lastPage, _pages) => lastPage.locations?.info?.next,
      }
    );

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
      <h1>episodes page</h1>
      <div className="mx-14 md:mx-24 xl:mx-40">
        <LocationCardList
          pages={data?.pages}
          topRef={topRef}
          bottomRef={bottomRef}
        />
        <div className="mx-auto my-3 text-center">
          {!hasNextPage && !(isLoading || isFetching) && <p>end of results</p>}
        </div>
      </div>
    </LayoutQuery>
  );
};

export default LocationsPage;
