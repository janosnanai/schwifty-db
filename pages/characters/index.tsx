import type { NextPage } from "next";
import type { ChangeEvent, FormEvent } from "react";
import type { FilterCharacter } from "../../graphql/_generated";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import CharacterCard from "../../components/card/character-card";
import { getManyCharactersQueryFn } from "../../lib/api/query-functions";

const CharactersPage: NextPage = () => {
  const [filter, setFilter] = useState<FilterCharacter>({});
  const [nameFilterInput, setNameFilterInput] = useState<string>("");

  const { isLoading, isError, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery(
      ["characters", filter],
      ({ pageParam }) => getManyCharactersQueryFn(pageParam, filter),
      {
        getNextPageParam: (lastPage, _pages) => lastPage.characters?.info?.next,
      }
    );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFilter({ name: nameFilterInput });
    setNameFilterInput("");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNameFilterInput(event.target.value);
  }

  function handleFetchMore() {
    fetchNextPage({ cancelRefetch: false });
  }

  return (
    <>
      <div className="px-9 py-5 space-y-3 text-slate-600">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            className="border"
            value={nameFilterInput}
            placeholder="type filter here..."
          />
        </form>
        <div>
          <button
            onClick={handleFetchMore}
            disabled={isLoading || !hasNextPage}
            className="border px-3 py-1 bg-slate-100 hover:text-slate-900 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
          >
            load more
          </button>
        </div>
        {data?.pages.length && (
          <p>
            {`${data.pageParams[data.pageParams.length - 1] || 1} / ${
              data.pages[data.pages.length - 1].characters?.info?.pages
            }`}
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {data?.pages.map((page) =>
          page.characters?.results?.map((c) => (
            <CharacterCard key={"c" + c!.id} character={c!} />
          ))
        )}
      </div>
    </>
  );
};

export default CharactersPage;
