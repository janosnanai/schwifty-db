import type { NextPage } from "next";
import type { ChangeEvent, FormEvent } from "react";
import type { FilterCharacter } from "../../graphql/_generated";

import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GetManyCharactersDocument } from "../../graphql/_generated";
import CharacterCard from "../../components/card/character-card";

const CharactersPage: NextPage = () => {
  const [filter, setFilter] = useState<FilterCharacter>({});
  const [nameFilterInput, setNameFilterInput] = useState<string>("");
  const { loading, error, data, fetchMore } = useQuery(
    GetManyCharactersDocument,
    {
      variables: { filter },
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
    if (!data) return;
    if (!data.characters) return;
    if (!data.characters.info) return;
    if (data.characters.info.next) {
      fetchMore({
        variables: {
          page: data.characters.info.next,
        },
      });
    }
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
            disabled={loading || (data && !data.characters!.info!.next)}
            className="border px-3 py-1 bg-slate-100 hover:text-slate-900 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
          >
            load more
          </button>
        </div>
        {data && data.characters!.info && (
          <p>
            {`${
              (data.characters!.info.next && data.characters!.info.next - 1) ||
              (data.characters!.info.prev && data.characters!.info.prev + 1) ||
              1
            } / ${data.characters!.info.pages}`}
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {data &&
          data.characters!.results!.map(
            (c) => c && <CharacterCard key={"c" + c.id} character={c} />
          )}
      </div>
    </>
  );
};

export default CharactersPage;
