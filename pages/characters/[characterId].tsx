import type { NextPage } from "next";

import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GetOneCharacterDocument } from "../../graphql/generated";

const CharacterPage: NextPage = () => {
  const router = useRouter();
  const { characterId } = router.query;
  const { loading, error, data } = useQuery(GetOneCharacterDocument, {
    variables: { id: characterId as string },
  });

  console.log(data);

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
            <li>name: {data.character.name}</li>
            <li>name: {data.character.name}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CharacterPage;
