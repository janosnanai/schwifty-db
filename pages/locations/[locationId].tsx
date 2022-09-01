import type { NextPage } from "next";

import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import LayoutQuery from "../../components/layout/layout-query";
import { getOneLocationQueryFn } from "../../lib/api/query-functions";

import { FALLBACK_PROP_TEXT } from "../../lib/constants";

const LocationPage: NextPage = () => {
  const router = useRouter();
  const { locationId } = router.query;

  const { isLoading, isError, data } = useQuery(["location", locationId], () =>
    getOneLocationQueryFn(locationId as string)
  );

  if (!data?.location) return null;

  return (
    <LayoutQuery>
      <div className="p-9">
        <h1 className="text-3xl text-center">{data.location.name}</h1>
        <div className="flex flex-wrap justify-center">
          <div className="bg-zinc-800 rounded-lg m-1.5 h-[300px] w-[300px] overflow-hidden">
            <ul className="m-3 space-y-3">
              <li>
                <span>type:</span>
                <span>{data.location.type || FALLBACK_PROP_TEXT}</span>
              </li>
              <li>
                <span>dimension:</span>
                <span>{data.location.dimension || FALLBACK_PROP_TEXT}</span>
              </li>
            </ul>
          </div>
          <div className="bg-zinc-800 rounded-lg m-1.5 h-[300px] w-[300px] overflow-hidden flex flex-col justify-between">
            <h3 className="">
              {`residents(${data.location.residents.length}):`}
            </h3>
            <ul className="h-64 overflow-auto">
              {data.location.residents.map((resident) => (
                <li key={"e" + resident!.id}>
                  <Link href={`/characters/${resident?.id}`}>
                    <a>{resident?.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </LayoutQuery>
  );
};

export default LocationPage;
