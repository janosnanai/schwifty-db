import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { GetCharactersDocument } from "../../graphql/generated";
import Card from "../../components/card/card";

const Characters: NextPage = () => {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState<number>();

  const { loading, error, data } = useQuery(GetCharactersDocument, {
    variables: { filter, page },
  });
  const [nameFilterInput, setNameFilterInput] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFilter({ name: nameFilterInput });
    setNameFilterInput("");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNameFilterInput(event.target.value);
  }

  function handleFetchPrev() {
    if (!data) {
      return;
    }
    setPage(data.characters!.info!.prev!);
  }
  async function handleFetchNext() {
    if (!data) {
      return;
    }
    setPage(data.characters!.info!.next!);
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
        <div className="space-x-3">
          <button
            onClick={handleFetchPrev}
            disabled={loading || (data && !data.characters!.info!.prev)}
            className="border px-3 py-1 bg-slate-100 hover:text-slate-900 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
          >
            prev
          </button>
          <button
            onClick={handleFetchNext}
            disabled={loading || (data && !data.characters!.info!.next)}
            className="border px-3 py-1 bg-slate-100 hover:text-slate-900 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
          >
            next
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
            (c) => c && <Card key={"c" + c.id} character={c} />
          )}
      </div>
    </>
  );
};

export default Characters;
