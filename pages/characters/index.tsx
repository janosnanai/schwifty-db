import type { NextPage } from "next";

import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

import CharacterCardList from "../../components/card/character-card-list";
import CharacterFilterMenu from "../../components/filter-menu/character-filter-menu";
import FilterPopover from "../../components/ui/filter-popover";
import { charactersFilterAtom } from "../../lib/atoms";
import { getManyCharactersQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll } from "../../lib/hooks";

const CharactersPage: NextPage = () => {
  const [charactersFilter, _setCharactersFilter] =
    useAtom(charactersFilterAtom);

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

  const sentryRef = useInfiniteScroll(
    () => fetchNextPage({ cancelRefetch: false }),
    hasNextPage
  );

  return (
    <>
      <FilterPopover className="fixed bottom-10 right-10 z-10">
        <CharacterFilterMenu />
      </FilterPopover>
      <div className="px-36">
        <CharacterCardList pages={data?.pages} />
        <div className="mx-auto my-3 text-center" ref={sentryRef}>
          <PulseLoader
            size={15}
            speedMultiplier={1.2}
            loading={isLoading || isFetching}
          />
          {!hasNextPage && !(isLoading || isFetching) && <p>end of results</p>}
        </div>
      </div>
    </>
  );
};

export default CharactersPage;
