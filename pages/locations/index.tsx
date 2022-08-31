import type { NextPage } from "next";

import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

import LocationCardList from "../../components/card/location-card-list";
import LocationFilterForm from "../../components/filter-form/locations-filter-form";
import FilterPopover from "../../components/ui/filter-popover";
import ToTopButton from "../../components/ui/to-top-button";
import LayoutQuery from "../../components/layout/layout-query";
import {
  locationsFilterGetterAtom,
  locationsFilterActiveAtom,
} from "../../lib/atoms";
import { getManyLocationsQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll, useIntersectionObserver } from "../../lib/hooks";

const LocationsPage: NextPage = () => {
  const [locationsFilter] = useAtom(locationsFilterGetterAtom);

  const [filterIsActive] = useAtom(locationsFilterActiveAtom);

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

  const bottomRef = useInfiniteScroll(
    () => fetchNextPage({ cancelRefetch: false }),
    hasNextPage
  );

  const { observedRef: topRef, isVisible: isTopVisible } =
    useIntersectionObserver();

  return (
    <LayoutQuery>
      <ToTopButton className="fixed bottom-24 right-10" show={!isTopVisible} />
      <FilterPopover
        className="fixed bottom-10 right-10 z-10"
        active={filterIsActive}
      >
        <LocationFilterForm />
      </FilterPopover>
      <h1>episodes page</h1>
      <div className="px-36">
        <LocationCardList
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

export default LocationsPage;
