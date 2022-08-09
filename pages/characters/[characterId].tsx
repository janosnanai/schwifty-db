import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

const CharacterPage: NextPage = () => {
  const router = useRouter();
  const { characterId } = router.query;

  return (
    <h1 className="text-2xl">{`single character page for character # ${characterId}`}</h1>
  );
};

export default CharacterPage;
