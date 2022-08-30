import type { FilterEpisode } from "../../graphql/_generated";

import { atom } from "jotai";

import { shallowCompare } from "../helpers";

export enum EpisodesFilterActionTypes {
  SET_NAME_FILTER,
  SET_EPISODE_FILTER,
  RESET_FILTER,
}

const initialEpisodesFilter: FilterEpisode = {
  name: "",
  episode: "",
};

// live filter atoms

const episodesFilterBaseAtom = atom(initialEpisodesFilter);

export const episodesFilterSetterAtom = atom(null, (get, set) => {
  const newFilter = get(episodesFilterInputGetterAtom);
  set(episodesFilterBaseAtom, newFilter);
});

export const episodesFilterGetterAtom = atom((get) =>
  get(episodesFilterBaseAtom)
);

// filter input atoms

const episodesFilterInputBaseAtom = atom(initialEpisodesFilter);

const episodesFilterInputNameSetterAtom = atom(
  null,
  (_get, set, name?: string | null) => {
    set(episodesFilterInputBaseAtom, (prev) => ({ ...prev, name }));
  }
);

const episodesFilterInputEpisodeSetterAtom = atom(
  null,
  (_get, set, episode?: string | null) => {
    set(episodesFilterInputBaseAtom, (prev) => ({ ...prev, episode }));
  }
);

const episodesFilterInputResetAtom = atom(null, (_get, set) =>
  set(episodesFilterInputBaseAtom, initialEpisodesFilter)
);

export const episodesFilterInputGetterAtom = atom((get) =>
  get(episodesFilterInputBaseAtom)
);

export const episodesFilterInputDispatchAtom = atom(
  null,
  (_get, set, action: EpisodesFilterAction) => {
    switch (action.type) {
      case EpisodesFilterActionTypes.SET_NAME_FILTER:
        set(episodesFilterInputNameSetterAtom, action.payload);
        break;
      case EpisodesFilterActionTypes.SET_EPISODE_FILTER:
        set(episodesFilterInputEpisodeSetterAtom, action.payload);
        break;
      case EpisodesFilterActionTypes.RESET_FILTER:
        set(episodesFilterInputResetAtom);
        break;
      default:
        throw new Error("unknown action type");
    }
  }
);

export const episodesFilterActiveAtom = atom(
  (get) =>
    !shallowCompare(get(episodesFilterInputBaseAtom), initialEpisodesFilter)
);
