import type { FilterCharacter } from "../../graphql/_generated";

import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

import shallowCompare from "../shallow-compare";

export enum CharactersFilterActionTypes {
  SET_NAME_FILTER = "set_name_filter",
  SET_STATUS_FILTER = "set_status_filter",
  SET_SPECIES_FILTER = "set_species_filter",
  SET_TYPE_FILTER = "set_type_filter",
  SET_GENDER_FILTER = "set_gender_filter",
  RESET_FILTER = "reset_filter",
}

const initialCharactersFilter: FilterCharacter = {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
};

function charactersFilterInputReducer(
  prev: FilterCharacter,
  action: CharactersFilterAction
) {
  switch (action.type) {
    case CharactersFilterActionTypes.SET_NAME_FILTER:
      return { ...prev, name: action.payload };
    case CharactersFilterActionTypes.SET_STATUS_FILTER:
      return { ...prev, status: action.payload };
    case CharactersFilterActionTypes.SET_SPECIES_FILTER:
      return { ...prev, species: action.payload };
    case CharactersFilterActionTypes.SET_TYPE_FILTER:
      return { ...prev, type: action.payload };
    case CharactersFilterActionTypes.SET_GENDER_FILTER:
      return { ...prev, gender: action.payload };
    case CharactersFilterActionTypes.RESET_FILTER:
      return initialCharactersFilter;
    default:
      throw new Error("unknown action type");
  }
}

export const charactersFilterAtom = atom(initialCharactersFilter);

export const charactersFilterInputReducerAtom = atomWithReducer(
  initialCharactersFilter,
  charactersFilterInputReducer
);

export const charactersFilterActiveAtom = atom((get) =>
  !shallowCompare(get(charactersFilterInputReducerAtom), initialCharactersFilter)
);
