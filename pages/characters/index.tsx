import type { NextPage } from "next";

import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

import CharacterCardList from "../../components/card/character-card-list";
import CharactersFilterForm from "../../components/filter-form/characters-filter-form";
import FilterPopover from "../../components/ui/filter-popover";
import ToTopButton from "../../components/ui/to-top-button";
import LayoutQuery from "../../components/layout/layout-query";
import {
  charactersFilterGetterAtom,
  charactersFilterActiveAtom,
} from "../../lib/atoms";
import { getManyCharactersQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll, useIntersectionObserver } from "../../lib/hooks";

const CharactersPage: NextPage = () => {
  const [charactersFilter] = useAtom(charactersFilterGetterAtom);

  const [filterIsActive] = useAtom(charactersFilterActiveAtom);

  const { isLoading, isFetching, isError, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery(
      ["characters", charactersFilter],
      ({ pageParam }) => {
        return getManyCharactersQueryFn(pageParam, charactersFilter);
      },
      {
        getNextPageParam: (lastPage, _pages) => lastPage.characters?.info?.next,
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
        <CharactersFilterForm />
      </FilterPopover>
      <h1>characters page</h1>
      <div className="sm:px-36">
        <CharacterCardList
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

export default CharactersPage;
