import type {
  GetManyCharactersQuery,
  GetManyEpisodesQuery,
  GetManyLocationsQuery,
  GetOneCharacterQuery,
  GetOneEpisodeQuery,
  GetOneLocationQuery,
} from "../../graphql/_generated";

import { request } from "graphql-request";

import {
  GetManyCharactersDocument,
  GetManyEpisodesDocument,
  GetManyLocationsDocument,
  GetOneCharacterDocument,
  GetOneEpisodeDocument,
  GetOneLocationDocument,
} from "../../graphql/_generated";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT as string;

export const getManyCharactersQueryFn = async (pageParam = 1, filter = {}) => {
  const data = await request({
    url: API_ENDPOINT,
    document: GetManyCharactersDocument,
    variables: { filter, page: pageParam },
  });
  return data as GetManyCharactersQuery;
};

export const getManyEpisodesQueryFn = async (pageParam = 1, filter = {}) => {
  const data = await request({
    url: API_ENDPOINT,
    document: GetManyEpisodesDocument,
    variables: { filter, page: pageParam },
  });
  return data as GetManyEpisodesQuery;
};

export const getManyLocationsQueryFn = async (pageParam = 1, filter = {}) => {
  const data = await request({
    url: API_ENDPOINT,
    document: GetManyLocationsDocument,
    variables: { filter, page: pageParam },
  });
  return data as GetManyLocationsQuery;
};

export const getOneCharacterQueryFn = async (id: string) => {
  const data = await request({
    url: API_ENDPOINT,
    document: GetOneCharacterDocument,
    variables: { id },
  });
  return data as GetOneCharacterQuery;
};

export const getOneEpisodeQueryFn = async (id: string) => {
  const data = await request({
    url: API_ENDPOINT,
    document: GetOneEpisodeDocument,
    variables: { id },
  });
  return data as GetOneEpisodeQuery;
};

export const getOneLocationQueryFn = async (id: string) => {
  const data = await request({
    url: API_ENDPOINT,
    document: GetOneLocationDocument,
    variables: { id },
  });
  return data as GetOneLocationQuery;
};
