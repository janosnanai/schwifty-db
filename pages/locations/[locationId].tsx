import type { GetOneLocationQuery } from "../../graphql/_generated";
import type { NextPage } from "next";

import Head from "next/head";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import CharactersList from "../../components/single-entity-page-components/characters-list";
import ErrorBanner from "../../components/ui/error-banner";
import LayoutMain from "../../components/layout/layout-main";
import { getOneLocationQueryFn } from "../../lib/api/query-functions";
import {
  errorBannerMessageSetterAtom,
  errorBannerShowSetterAtom,
  loadingSpinnerSetterAtom,
} from "../../lib/atoms";
import { SingleEntityDataList } from "../../components/single-entity-page-components/data-list";

const LocationPage: NextPage = () => {
  const router = useRouter();
  const { locationId } = router.query;

  const { isLoading, isFetching, isError, data, error, refetch } = useQuery<
    GetOneLocationQuery,
    Error | null,
    GetOneLocationQuery,
    (string | string[] | undefined)[]
  >(["location", locationId], () =>
    getOneLocationQueryFn(locationId as string)
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
    <>
      <Head>
        <title>
          schwiftyDB - location: {data?.location?.name ?? locationId}
        </title>
      </Head>
      <LayoutMain>
        <>
          <ErrorBanner refetch={refetch} />
          <h1 className="font-heading text-4xl text-center text-zinc-700 dark:text-zinc-100 mb-7 uppercase">
            location
          </h1>
          {data?.location && (
            <div className="flex items-center sm:items-start sm:justify-center gap-2 flex-col sm:flex-row">
              <SingleEntityDataList label="overview">
                <SingleEntityDataList.Item
                  label="name"
                  content={data.location.name}
                />
                <SingleEntityDataList.Item
                  label="type"
                  content={data.location.type}
                />
                <SingleEntityDataList.Item
                  label="dimension"
                  content={data.location.dimension}
                />
              </SingleEntityDataList>
              <CharactersList
                className="mb-9"
                label="residents"
                list={data.location.residents}
                linkRoot="/characters/"
              />
            </div>
          )}
        </>
      </LayoutMain>
    </>
  );
};

export default LocationPage;
