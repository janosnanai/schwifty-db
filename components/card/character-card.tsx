import type { Character } from "../../graphql/generated";

import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMG_URL =
  "https://rickandmortyapi.com/api/character/avatar/19.jpeg";
const FALLBACK_PROP_TEXT = "unknown";

function CharacterCard({ character }: { character: Partial<Character> }) {
  return (
    <article className="group flex m-2 bg-slate-50 shadow rounded-md overflow-hidden h-52 w-[36rem]">
      <div className="w-1/3 relative">
        <Image
          src={character.image || FALLBACK_IMG_URL}
          layout="fill"
          alt={character.name || FALLBACK_IMG_URL}
          className="group-hover:scale-[1.03] transition ease-in duration-[1200ms] object-cover"
        />
      </div>
      <div className="w-2/3 px-5 border-l-8">
        <div className="mb-5 mt-3">
          <Link href={`/characters/${character.id}`}>
            <a>
              <h2 className="text-slate-800 text-2xl font-bold tracking-tight">
                {character.name}
              </h2>
            </a>
          </Link>
          <p className="text-sm text-slate-900 tracking-wide">
            {`${character.status || FALLBACK_PROP_TEXT}`}{" "}
          </p>
        </div>
        <div className="text-sm text-slate-900 tracking-wide">
          <p>{`${character.species || FALLBACK_PROP_TEXT} - ${
            character.gender || FALLBACK_PROP_TEXT
          }`}</p>
          <p>{`location: ${
            (character.location && character.location.name) ||
            FALLBACK_PROP_TEXT
          }`}</p>
        </div>
      </div>
    </article>
  );
}

export default CharacterCard;