import type { NextPage } from "next";
import type { FilterCharacter } from "../../graphql/_generated";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

import CharacterCardList from "../../components/card/character-card-list";
import CharacterFilterMenu from "../../components/filter-menu/character-filter-menu";
import { getManyCharactersQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll } from "../../lib/hooks";

const CharactersPage: NextPage = () => {
  const [filter, setFilter] = useState<FilterCharacter>({});

  const { isLoading, isFetching, isError, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery(
      ["characters", filter],
      ({ pageParam }) => {
        return getManyCharactersQueryFn(pageParam, filter);
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
      <CharacterFilterMenu onSearch={setFilter} />
      <div className="pl-72">
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
