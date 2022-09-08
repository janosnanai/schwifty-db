import type { NextPage } from "next";
import type {
  EpisodeCoreFragment,
  GetOneCharacterQuery,
} from "../../graphql/_generated";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import ErrorBanner from "../../components/ui/error-banner";
import LayoutQuery from "../../components/layout/layout-query";
import { getOneCharacterQueryFn } from "../../lib/api/query-functions";
import {
  errorBannerMessageSetterAtom,
  errorBannerShowSetterAtom,
  loadingSpinnerSetterAtom,
} from "../../lib/atoms";

import fallbackImage from "../../public/images/ram-fallback.jpeg";
import { FALLBACK_PROP_TEXT } from "../../lib/constants";

const CharacterPage: NextPage = () => {
  const router = useRouter();
  const { characterId } = router.query;

  const { isLoading, isFetching, isError, data, error, refetch } = useQuery<
    GetOneCharacterQuery,
    Error | null,
    GetOneCharacterQuery,
    (string | string[] | undefined)[]
  >(["character", characterId], () =>
    getOneCharacterQueryFn(characterId as string)
  );

  const [, setIsLoading] = useAtom(loadingSpinnerSetterAtom);
  const [, setErrorMessage] = useAtom(errorBannerMessageSetterAtom);
  const [, setErrorShow] = useAtom(errorBannerShowSetterAtom);

  useEffect(() => {
    setErrorShow(isError);
    setErrorMessage(error ? error.message : "");
  }, [isError, error, setErrorShow, setErrorMessage]);

  useEffect(() => {
    setIsLoading(isLoading || isFetching);
  }, [isLoading, isFetching, setIsLoading]);

  return (
    <LayoutQuery>
      <>
        <ErrorBanner refetch={refetch} />
        <h1 className="text-4xl text-center text-zinc-700 dark:text-zinc-100 mb-7 uppercase">
          character
        </h1>
        {data?.character && (
          <>
            <div className="flex items-center sm:items-start sm:justify-center gap-2 flex-col sm:flex-row">
              <div className="h-[300px] w-[300px] rounded-lg overflow-hidden shadow">
                <Image
                  src={data.character.image || fallbackImage}
                  alt={data.character.name || FALLBACK_PROP_TEXT}
                  width={300}
                  height={300}
                />
              </div>
              <div className="w-[300px] min-h-[300px] max-h-min bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg shadow">
                <ul className="space-y-3">
                  <SingleEntityDataListItem
                    label="name"
                    content={data.character.name}
                  />
                  <SingleEntityDataListItem
                    label="species"
                    content={data.character.species}
                  />
                  <SingleEntityDataListItem
                    label="gender"
                    content={data.character.gender}
                  />
                  <SingleEntityDataListItem
                    label="type"
                    content={data.character.type}
                  />
                  <SingleEntityDataListItem
                    label="status"
                    content={data.character.status}
                  />
                  <hr className="border-purple-500 m-3" />
                  <SingleEntityDataListItem
                    label="origin"
                    content={data.character.origin?.name}
                    link={
                      data.character.origin?.id
                        ? `/locations/${data.character.origin?.id}`
                        : null
                    }
                  />
                  <SingleEntityDataListItem
                    label="location"
                    content={data.character.location?.name}
                    link={
                      data.character.location?.id
                        ? `/locations/${data.character.location?.id}`
                        : null
                    }
                  />
                </ul>
              </div>
            </div>
            <CharacterEpisodesList
              className="mt-2 mx-auto"
              label="appearances"
              list={data.character.episode}
              linkRoot="/episodes/"
            />
          </>
        )}
      </>
    </LayoutQuery>
  );
};

function SingleEntityDataListItem({
  label,
  content = null,
  link = null,
}: {
  label: string;
  content?: string | null;
  link?: string | null;
}) {
  return (
    <li className="flex items-top py-1">
      <h2 className="text-xs text-zinc-700 dark:text-zinc-400 uppercase w-16 pr-2 mt-1">
        {label}
      </h2>
      {!link && (
        <p className="text-zinc-900 dark:text-zinc-200 w-[220px] pl-2">
          {content || FALLBACK_PROP_TEXT}
        </p>
      )}
      {link && (
        <Link href={link}>
          <a>
            <p className="text-emerald-800 dark:text-emerald-300 w-[220px] pl-2 hover:underline underline-offset-2">
              {content}
            </p>
          </a>
        </Link>
      )}
    </li>
  );
}

function CharacterEpisodesList({
  label,
  list,
  linkRoot,
  className,
}: {
  label: string;
  list?: (EpisodeCoreFragment | null)[] | null;
  linkRoot?: string;
  className?: string;
}) {
  return (
    <div
      className={
        className +
        " " +
        "bg-zinc-100 dark:bg-zinc-800 rounded-lg min-h-[300px] max-h-[432px] w-[300px] sm:w-[608px] overflow-hidden flex flex-col justify-start shadow"
      }
    >
      <h2 className="bg-zinc-200 dark:bg-zinc-900/50 p-2 border-b border-purple-500">
        <span className="uppercase text-zinc-900 dark:text-zinc-200">{label}</span>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">{`(${
          list?.length ?? 0
        })`}</span>
      </h2>
      {list && (
        <ul className="overflow-auto space-y-2 p-2">
          {list.map(
            (item) =>
              item && (
                //eslint bug?
                //eslint-disable-next-line
                <li key={"e" + item.id}>
                  <Link href={`${linkRoot}${item?.id}`}>
                    <a className="group flex gap-2">
                      <p className="text-emerald-800 dark:text-emerald-300 group-hover:underline underline-offset-2">
                        {item?.episode}
                      </p>
                      <p className="text-emerald-600 dark:text-emerald-400 group-hover:underline underline-offset-2 truncate">
                        {item?.name}
                      </p>
                    </a>
                  </Link>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}

export default CharacterPage;
