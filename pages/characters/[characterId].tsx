import type { NextPage } from "next";

import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import LayoutQuery from "../../components/layout/layout-query";
import { getOneCharacterQueryFn } from "../../lib/api/query-functions";

import fallbackImage from "../../public/images/ram-fallback.jpeg";

const FALLBACK_PROP_TEXT = "unknown";

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
      <div className="p-9 flex flex-wrap justify-center">
        <div className="m-1.5 h-[300px] w-[300px] rounded-lg overflow-hidden">
          <Image
            src={data.character.image || fallbackImage}
            alt={data.character.name || FALLBACK_PROP_TEXT}
            width={300}
            height={300}
          />
        </div>
        <div className="bg-zinc-800 m-1.5 h-[300px] w-[300px] rounded-lg overflow-hidden">
          <ul className="m-5">
            <li>name: {data.character.name}</li>
            <li>species: {data.character.species}</li>
            <li>gender: {data.character.gender}</li>
            <li>origin: {data.character.origin?.name}</li>
            <li>location: {data.character.location?.name}</li>
          </ul>
        </div>
        <div className="bg-zinc-800 m-1.5 h-[300px] w-[300px] rounded-lg overflow-hidden">
          <p>
            <span className="">episodes: </span>
            <span>{data.character.episode.length}</span>
          </p>
        </div>
      </div>
    </LayoutQuery>
  );
};

export default CharacterPage;
