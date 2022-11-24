import type { GetOneCharacterQuery } from "../../graphql/_generated";
import type { NextPage } from "next";

import Image from "next/image";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import EpisodesList from "../../components/single-entity-page-components/episodes-list";
import ErrorBanner from "../../components/ui/error-banner";
import LayoutQuery from "../../components/layout/layout-query";
import { getOneCharacterQueryFn } from "../../lib/api/query-functions";
import {
  errorBannerMessageSetterAtom,
  errorBannerShowSetterAtom,
  loadingSpinnerSetterAtom,
} from "../../lib/atoms";
import { SingleEntityDataList } from "../../components/single-entity-page-components/data-list";

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
        <h1 className="font-dosis text-4xl text-center text-zinc-700 dark:text-zinc-100 mb-7 uppercase">
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
              <SingleEntityDataList label="overview">
                <SingleEntityDataList.Item
                  label="name"
                  content={data.character.name}
                />
                <SingleEntityDataList.Item
                  label="species"
                  content={data.character.species}
                />
                <SingleEntityDataList.Item
                  label="gender"
                  content={data.character.gender}
                />
                <SingleEntityDataList.Item
                  label="type"
                  content={data.character.type}
                />
                <SingleEntityDataList.Item
                  label="status"
                  content={data.character.status}
                />
                <hr className="border-purple-500 m-3" />
                <SingleEntityDataList.Item
                  label="origin"
                  content={data.character.origin?.name}
                  link={
                    data.character.origin?.id
                      ? `/locations/${data.character.origin?.id}`
                      : null
                  }
                />
                <SingleEntityDataList.Item
                  label="location"
                  content={data.character.location?.name}
                  link={
                    data.character.location?.id
                      ? `/locations/${data.character.location?.id}`
                      : null
                  }
                />
              </SingleEntityDataList>
            </div>
            <EpisodesList
              className="mt-2 mb-9 mx-auto"
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

export default CharacterPage;
