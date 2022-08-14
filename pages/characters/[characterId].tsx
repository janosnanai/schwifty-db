import type { NextPage } from "next";

import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { getOneCharacterQueryFn } from "../../lib/api/query-functions";

const CharacterPage: NextPage = () => {
  const router = useRouter();
  const { characterId } = router.query;

  const { isLoading, isError, data } = useQuery(
    ["character", characterId],
    () => getOneCharacterQueryFn(characterId as string)
  );

  return (
    <>
      <h1 className="text-2xl">{`single character page for character # ${characterId}`}</h1>
      {data && data.character && (
        <div>
          <Image
            src={data.character.image!}
            alt={data.character.name!}
            width={300}
            height={300}
          />
          <ul className="m-5">
            <li>name: {data.character.name}</li>
            <li>species: {data.character.species}</li>
            <li>gender: {data.character.gender}</li>
            <li>origin: {data.character.origin?.name}</li>
            <li>location: {data.character.location?.name}</li>
          </ul>
          <p>
            <span className="">episodes: </span>
            <span>{data.character.episode.length}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CharacterPage;
