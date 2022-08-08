import Image from "next/image";
import { Character } from "../../graphql/generated";

const FALLBACK_IMG_URL =
  "https://rickandmortyapi.com/api/character/avatar/18.jpeg";
const FALLBACK_PROP_TEXT = "unknown";

function Card({ character }: { character: Partial<Character> }) {
  return (
    <article className="flex m-2 bg-slate-50 shadow rounded-md overflow-hidden h-52 w-[36rem]">
      <div className="w-1/3 relative">
        <Image
          src={character.image || FALLBACK_IMG_URL}
          layout="fill"
          alt={character.name || FALLBACK_IMG_URL}
          className="hover:scale-105 transition duration-1000 object-cover"
        />
      </div>
      <div className="w-2/3 px-5 border-l-8">
        <div className="mb-5 mt-3">
          <h2 className="text-slate-800 text-2xl font-bold tracking-tight">
            {character.name}
          </h2>
        </div>
        <div className="text-sm text-slate-900 tracking-wide">
          <p>{`${character.status || FALLBACK_PROP_TEXT}`} </p>
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

export default Card;