import axios from "axios";
import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

import Card from "../../components/card/card";

const Characters: NextPage = () => {
  const [characters, setCharacters] = useState<RAMCharacter[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<RAMPaginationInfo>();
  const [nameFilter, setNameFilter] = useState<string>("");

  async function fetchMany(
    {
      ...kwargs
    }: {
      url?: string;
      queryParams?: string;
    } = { url: "https://rickandmortyapi.com/api/character/", queryParams: "" }
  ) {
    const url = kwargs.url || "https://rickandmortyapi.com/api/character/";
    const queryParams = kwargs.queryParams || "";
    const response = await axios.get(url + queryParams);

    const { info, results } = response.data as RAMCharacterListChunk;

    setPaginationInfo(info);
    setCharacters(results);
  }

  async function handleFetchAll() {
    await fetchMany();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await fetchMany({ queryParams: `?name=${nameFilter}` });
    setNameFilter("");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNameFilter(event.target.value);
  }

  async function handleFetchPrev() {
    await fetchMany({ url: paginationInfo?.prev });
  }
  async function handleFetchNext() {
    await fetchMany({ url: paginationInfo?.next });
  }

  return (
    <>
      <div className="px-9 py-5 space-y-3 text-slate-600">
        <button
          onClick={handleFetchAll}
          className="border px-3 py-1 bg-slate-100 hover:text-slate-900 hover:shadow hover:shadow-lime-200"
        >
          see all
        </button>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            className="border"
            value={nameFilter}
            placeholder="type filter here..."
          />
        </form>
        <div className="space-x-3">
          <button
            onClick={handleFetchPrev}
            disabled={!paginationInfo?.prev}
            className="border px-3 py-1 bg-slate-100 hover:text-slate-900 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
          >
            prev
          </button>
          <button
            onClick={handleFetchNext}
            disabled={!paginationInfo?.next}
            className="border px-3 py-1 bg-slate-100 hover:text-slate-900 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
          >
            next
          </button>
        </div>
        {paginationInfo && (
          <p>
            {`${
              (paginationInfo.next &&
                Number(paginationInfo.next.split("?page=")[1].split("&")[0]) -
                  1) ||
              (paginationInfo.prev &&
                Number(paginationInfo.prev.split("?page=")[1].split("&")[0]) +
                  1) ||
              1
            } / ${paginationInfo.pages}`}
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {characters.map((c) => (
          <Card key={"c" + c.id} character={c} />
        ))}
      </div>
    </>
  );
};

export default Characters;
