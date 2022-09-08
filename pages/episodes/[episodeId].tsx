import type { GetOneEpisodeQuery } from "../../graphql/_generated";
import type { NextPage } from "next";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import CharactersList from "../../components/single-entity-page-components/characters-list";
import ErrorBanner from "../../components/ui/error-banner";
import LayoutQuery from "../../components/layout/layout-query";
import { getOneEpisodeQueryFn } from "../../lib/api/query-functions";
import {
  errorBannerMessageSetterAtom,
  errorBannerShowSetterAtom,
  loadingSpinnerSetterAtom,
} from "../../lib/atoms";
import { SingleEntityDataList } from "../../components/single-entity-page-components/data-list";

const LocationPage: NextPage = () => {
  const router = useRouter();
  const { episodeId } = router.query;

  const { isLoading, isFetching, isError, data, error, refetch } = useQuery<
    GetOneEpisodeQuery,
    Error | null,
    GetOneEpisodeQuery,
    (string | string[] | undefined)[]
  >(["episode", episodeId], () => getOneEpisodeQueryFn(episodeId as string));

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
          episode
        </h1>
        {data?.episode && (
          <div className="flex items-center sm:items-start sm:justify-center gap-2 flex-col sm:flex-row">
            <SingleEntityDataList label="overview">
              <SingleEntityDataList.Item
                label="episode"
                content={data.episode.episode}
              />
              <SingleEntityDataList.Item
                label="title"
                content={data.episode.name}
              />
              <SingleEntityDataList.Item
                label="air date"
                content={data.episode.air_date}
              />
            </SingleEntityDataList>
            <CharactersList
              className="mb-9"
              label="characters"
              list={data.episode.characters}
              linkRoot="/characters/"
            />
          </div>
        )}
      </>
    </LayoutQuery>
  );
};

export default LocationPage;
