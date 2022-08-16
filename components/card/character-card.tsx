import type { CharacterCardFragment } from "../../graphql/_generated";

import Image from "next/image";
import Link from "next/link";
import {
  IdentificationIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

import fallbackImage from "../../public/images/ram-fallback.jpeg";

const FALLBACK_PROP_TEXT = "unknown";

function CharacterCard({ character }: { character: CharacterCardFragment }) {
  return (
    <Link href={`/characters/${character.id}`}>
      <a>
        <article className="hover:shadow-xl transition-shadow ease-in-out flex flex-col justify-between m-2 bg-slate-100 shadow overflow-hidden h-[24rem] w-60">
          <div className="w-full h-56 relative">
            <Image
              src={character.image || fallbackImage}
              layout="fill"
              alt={character.name || FALLBACK_PROP_TEXT}
              className="object-cover"
            />
            <div className="absolute -bottom-12 left-2 w-52 px-2 pt-1 pb-2 bg-slate-50">
              <h2 className="text-slate-800 text-2xl font-bold tracking-tight">
                {character.name}
              </h2>
              <p className="text-sm text-slate-900 tracking-wide mt-1">
                {`${character.status || FALLBACK_PROP_TEXT}`}
              </p>
            </div>
          </div>
          <div className="w-full p-2 flex flex-col gap-1">
            <div className="flex items-center h-12 p-1 gap-2 text-sm text-slate-700 tracking-wide">
              <div className="border-r-2 pr-2">
                <IdentificationIcon className="w-6 h-6 text-slate-400" />
              </div>
              <p>{`${character.species || FALLBACK_PROP_TEXT} - ${
                character.gender || FALLBACK_PROP_TEXT
              }`}</p>
            </div>
            <div className="flex items-center h-12 p-1 gap-2 text-sm text-slate-900 tracking-wide">
              <div className="border-r-2 pr-2">
                <LocationMarkerIcon className="w-6 h-6 text-slate-400" />
              </div>
              <p>
                {(character.location && character.location.name) ||
                  FALLBACK_PROP_TEXT}
              </p>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
}

export default CharacterCard;
