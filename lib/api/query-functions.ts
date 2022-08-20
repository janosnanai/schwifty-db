import type {
  GetManyCharactersQuery,
  GetOneCharacterQuery,
} from "../../graphql/_generated";

import { request } from "graphql-request";

import {
  GetManyCharactersDocument,
  GetOneCharacterDocument,
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

export const getOneCharacterQueryFn = async (id: string) => {
  const data = await request({
    url: API_ENDPOINT,
    document: GetOneCharacterDocument,
    variables: { id },
  });
  return data as GetOneCharacterQuery;
};
