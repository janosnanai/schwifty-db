import type { MutableRefObject } from "react";
import type { CharacterCardFragment } from "../../graphql/_generated";

import Image from "next/image";
import Link from "next/link";
import { InformationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";

import fallbackImage from "../../public/images/ram-fallback.jpeg";

const FALLBACK_PROP_TEXT = "unknown";

function CharacterCard({
  character,
  cardRef = null,
}: {
  character: CharacterCardFragment;
  cardRef?: MutableRefObject<HTMLAnchorElement> | null;
}) {
  return (
    <Link
      href={`/characters/${character.id}`}
      ref={cardRef}
      className="group m-1.5 border-0 rounded-lg shadow shadow-emerald-400/50 border-emerald-400 hover:shadow-lg hover:m-1 hover:border-2 hover:shadow-emerald-400/30 transition ease-out overflow-hidden"
    >
      <article className="flex flex-col justify-between bg-zinc-100 dark:bg-zinc-800 h-[24rem] transition ease-out w-60">
        <div className="w-full h-56 relative">
          <Image
            src={character.image || fallbackImage}
            layout="fill"
            alt={character.name || FALLBACK_PROP_TEXT}
            className="object-cover"
          />
          <div className="absolute -bottom-12 left-2 w-52 px-2 pt-1 pb-2 shadow-sm bg-zinc-50/75 group-hover:bg-white/75 dark:bg-black/75 dark:group-hover:bg-zinc-900/75 transition ease-out backdrop-blur rounded">
            <h2 className="text-purple-800 dark:text-purple-500 font-dosis text-2xl font-bold tracking-normal leading-tight">
              {character.name}
            </h2>
            {character.type && (
              <p className="mb-1.5 mt-0.5 font-domine text-xs truncate text-zinc-600 dark:text-zinc-400">
                {character.type}
              </p>
            )}
            <div className="flex gap-1.5 items-center mt-1">
              <span
                className={`${
                  character.status === "Alive" ? "bg-green-500" : ""
                } ${character.status === "Dead" ? "bg-red-500" : ""} ${
                  character.status === "unknown" ? "bg-zinc-500" : ""
                } h-3 w-3 rounded-full`}
              ></span>
              <p className="font-domine text-sm text-zinc-900 dark:text-zinc-300 tracking-wide">
                {`${character.status || FALLBACK_PROP_TEXT}`}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-2 flex flex-col gap-1">
          <div className="flex items-center h-12 p-1 gap-2 font-domine text-sm text-zinc-700 dark:text-zinc-300 tracking-wide">
            <div className="border-r-2 border-zinc-300 dark:border-zinc-700 pr-2">
              <InformationCircleIcon className="w-6 h-6 text-purple-400" />
            </div>
            <p>{`${character.species || FALLBACK_PROP_TEXT} - ${
              character.gender || FALLBACK_PROP_TEXT
            }`}</p>
          </div>
          <div className="flex items-center h-12 p-1 gap-2 font-domine text-sm text-zinc-700 dark:text-zinc-300 tracking-wide">
            <div className="border-r-2 border-zinc-300 dark:border-zinc-700 pr-2">
              <MapPinIcon className="w-6 h-6 text-purple-400" />
            </div>
            <p>{character.location?.name || FALLBACK_PROP_TEXT}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default CharacterCard;
