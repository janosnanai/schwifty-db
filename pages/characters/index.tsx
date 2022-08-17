import type { NextPage } from "next";
import type { FilterCharacter } from "../../graphql/_generated";

import { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import CharacterCardList from "../../components/card/character-card-list";
import CharacterFilterMenu from "../../components/filter-menu/character-filter-menu";
import { getManyCharactersQueryFn } from "../../lib/api/query-functions";
import { useInfiniteScroll } from "../../hooks";

const CharactersPage: NextPage = () => {
  const [filter, setFilter] = useState<FilterCharacter>({});

  const { isLoading, isError, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery(
      ["characters", filter],
      ({ pageParam }) => {
        console.log(pageParam, filter);

        return getManyCharactersQueryFn(pageParam, filter);
      },
      {
        getNextPageParam: (lastPage, _pages) => lastPage.characters?.info?.next,
      }
    );

  const infiniteScrollCallback = useCallback(() => {
    fetchNextPage({ cancelRefetch: false });
  }, [fetchNextPage]);

  const sentryRef = useInfiniteScroll(infiniteScrollCallback, hasNextPage);

  return (
    <>
      <CharacterFilterMenu onSearch={setFilter} />
      <CharacterCardList pages={data?.pages} />
      <div
        className="w-96 m-auto text-center bg-red-500 text-white"
        ref={sentryRef}
      >
        <p>sentry element</p>
      </div>
    </>
  );
};

export default CharactersPage;
