import type {
  FilterCharacter,
  FilterEpisode,
  FilterLocation,
} from "../../graphql/_generated";

import { atom } from "jotai";

export const charactersFilterAtom = atom<FilterCharacter>({});
export const locationsFilterAtom = atom<FilterLocation>({});
export const episodesFilterAtom = atom<FilterEpisode>({});
