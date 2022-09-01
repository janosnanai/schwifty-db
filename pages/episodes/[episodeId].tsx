import type { NextPage } from "next";

import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import LayoutQuery from "../../components/layout/layout-query";
import { getOneEpisodeQueryFn } from "../../lib/api/query-functions";

import { FALLBACK_PROP_TEXT } from "../../lib/constants";

const LocationPage: NextPage = () => {
  const router = useRouter();
  const { episodeId } = router.query;

  const { isLoading, isError, data } = useQuery(["episode", episodeId], () =>
    getOneEpisodeQueryFn(episodeId as string)
  );

  if (!data?.episode) return null;

  return (
    <LayoutQuery>
      <div className="p-9">
        <h1 className="text-3xl text-center">{data.episode.episode}</h1>
        <div className="flex flex-wrap justify-center">
          <div className="bg-zinc-800 rounded-lg m-1.5 h-[300px] w-[300px] overflow-hidden">
            <ul className="m-3 space-y-3">
              <li>
                <span>title:</span>
                <span>{data.episode.name || FALLBACK_PROP_TEXT}</span>
              </li>
              <li>
                <span>air date:</span>
                <span>{data.episode.air_date || FALLBACK_PROP_TEXT}</span>
              </li>
            </ul>
          </div>
          <div className="bg-zinc-800 rounded-lg m-1.5 h-[300px] w-[300px] overflow-hidden flex flex-col justify-between">
            <h3 className="">
              {`characters(${data.episode.characters.length}):`}
            </h3>
            <ul className="h-64 overflow-auto">
              {data.episode.characters.map((character) => (
                <li key={"e" + character!.id}>
                  <Link href={`/characters/${character?.id}`}>
                    <a>{character?.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </LayoutQuery>
  );
};

export default LocationPage;
