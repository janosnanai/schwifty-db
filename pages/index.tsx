import axios from "axios";
import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

import Card from "../components/card/card";

const Home: NextPage = () => {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfoData>();
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

    const { info, results } = response.data as CharacterListChunk;

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
      <div className="px-9 py-5 space-y-3">
        <button
          onClick={handleFetchAll}
          className="border px-3 py-1 bg-slate-100 hover:shadow hover:shadow-lime-200"
        >
          see all
        </button>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            className="border"
            value={nameFilter}
          />
        </form>
        <div className="space-x-3">
          <button
            onClick={handleFetchPrev}
            disabled={!paginationInfo?.prev}
            className="border px-3 py-1 bg-slate-100 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
          >
            prev
          </button>
          <button
            onClick={handleFetchNext}
            disabled={!paginationInfo?.next}
            className="border px-3 py-1 bg-slate-100 disabled:text-slate-400 enabled:hover:shadow enabled:hover:shadow-lime-200"
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
      <div className="flex justify-center">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center flex-col gap-3">
          {characters.map((c) => (
            <Card key={"c" + c.id} character={c} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
