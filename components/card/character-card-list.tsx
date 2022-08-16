import type {
  Character,
  GetManyCharactersQuery,
} from "../../graphql/_generated";

import CharacterCard from "./character-card";

function CharacterCardList({
  pages,
}: {
  pages: GetManyCharactersQuery[] | undefined;
}) {
  const allCharacters: Character[] = [];
  pages?.forEach((page) => {
    if (!page.characters?.results) return;
    const currentCharacters = page.characters.results as Character[];
    allCharacters.push(...currentCharacters);
  });
  return (
    <div className="flex flex-wrap justify-center">
      {allCharacters.map((c) => (
        <CharacterCard key={"c" + c!.id} character={c!} />
      ))}
    </div>
  );
}

export default CharacterCardList;
