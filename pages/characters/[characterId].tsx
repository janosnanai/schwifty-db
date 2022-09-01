import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import LayoutQuery from "../../components/layout/layout-query";
import { getOneCharacterQueryFn } from "../../lib/api/query-functions";

import fallbackImage from "../../public/images/ram-fallback.jpeg";

import { FALLBACK_PROP_TEXT } from "../../lib/constants";

const CharacterPage: NextPage = () => {
  const router = useRouter();
  const { characterId } = router.query;

  const { isLoading, isError, data } = useQuery(
    ["character", characterId],
    () => getOneCharacterQueryFn(characterId as string)
  );

  if (!data?.character) return null;

  return (
    <LayoutQuery>
      <div className="p-9">
        <h1 className="text-3xl text-center">{data.character.name}</h1>
        <div className="flex flex-wrap justify-center">
          <div className="rounded-lg m-1.5 h-[300px] w-[300px] overflow-hidden">
            <Image
              src={data.character.image || fallbackImage}
              alt={data.character.name || FALLBACK_PROP_TEXT}
              width={300}
              height={300}
            />
          </div>
          <div className="bg-zinc-800 rounded-lg m-1.5 h-[300px] w-[300px] overflow-hidden">
            <ul className="m-3 space-y-3">
              <li>
                <span>species:</span>
                <span>{data.character.species || FALLBACK_PROP_TEXT}</span>
              </li>
              <li>
                <span>gender:</span>
                <span>{data.character.gender || FALLBACK_PROP_TEXT}</span>
              </li>
              <li>
                <span>type:</span>
                <span>{data.character.type || FALLBACK_PROP_TEXT}</span>
              </li>
              <li>
                <span>status:</span>
                <span>{data.character.status || FALLBACK_PROP_TEXT}</span>
              </li>
              <li>
                <span>origin:</span>
                {data.character.origin?.id && (
                  <Link href={`/locations/${data.character.origin?.id}`}>
                    <a>{data.character.origin?.name}</a>
                  </Link>
                )}
                {!data.character.origin?.id && (
                  <span>{FALLBACK_PROP_TEXT}</span>
                )}
              </li>
              <li>
                <span>location:</span>
                {data.character.location?.id && (
                  <Link href={`/locations/${data.character.location?.id}`}>
                    <a>{data.character.location?.name}</a>
                  </Link>
                )}
                {!data.character.location?.id && (
                  <span>{FALLBACK_PROP_TEXT}</span>
                )}
              </li>
            </ul>
          </div>
          <div className="bg-zinc-800 rounded-lg m-1.5 h-[300px] w-[300px] overflow-hidden flex flex-col justify-between">
            <h3 className="">
              {`appearances(${data.character.episode.length}):`}
            </h3>
            <ul className="h-64 overflow-auto">
              {data.character.episode.map((episode) => (
                <li key={"e" + episode!.id}>
                  <Link href={`/episodes/${episode?.id}`}>
                    <a>{`${episode?.episode} - ${episode?.name}`}</a>
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

export default CharacterPage;
