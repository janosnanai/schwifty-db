import type { RefObject } from "react";
import type {
  Character,
  GetManyCharactersQuery,
} from "../../graphql/_generated";

import CharacterCard from "./character-card";

function CharacterCardList({
  pages,
  topRef = null,
  bottomRef = null,
}: {
  pages: GetManyCharactersQuery[] | undefined;
  topRef?: RefObject<any> | null;
  bottomRef?: RefObject<any> | null;
}) {
  const allCharacters: Character[] = [];
  pages?.forEach((page) => {
    if (!page.characters?.results) return;
    const currentCharacters = page.characters.results as Character[];
    allCharacters.push(...currentCharacters);
  });

  return (
    <div className="flex flex-wrap justify-center">
      {allCharacters.map((character, idx) => {
        let cardRef = null;
        if (idx === 0) {
          cardRef = topRef;
        }
        if (idx === allCharacters.length - 1) {
          cardRef = bottomRef;
        }
        return (
          <CharacterCard
            key={"c" + character!.id}
            character={character!}
            cardRef={cardRef}
          />
        );
      })}
    </div>
  );
}

export default CharacterCardList;
