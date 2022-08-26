import type { FilterCharacter } from "../../graphql/_generated";

import { atom } from "jotai";

import { shallowCompare } from "../helpers";

export enum CharactersFilterActionTypes {
  SET_NAME_FILTER,
  SET_STATUS_FILTER,
  SET_SPECIES_FILTER,
  SET_GENDER_FILTER,
  RESET_FILTER,
}

const initialCharactersFilter: FilterCharacter = {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
};

// live filter atoms

const charactersFilterBaseAtom = atom(initialCharactersFilter);

export const charactersFilterSetterAtom = atom(null, (get, set) => {
  const newFilter = get(charactersFilterInputGetterAtom);
  set(charactersFilterBaseAtom, newFilter);
});

export const charactersFilterGetterAtom = atom((get) =>
  get(charactersFilterBaseAtom)
);

// filter input atoms

const charactersFilterInputBaseAtom = atom(initialCharactersFilter);

const charactersFilterInputNameSetterAtom = atom(
  null,
  (_get, set, name?: string | null) => {
    set(charactersFilterInputBaseAtom, (prev) => ({ ...prev, name }));
  }
);

const charactersFilterInputStatusSetterAtom = atom(
  null,
  (_get, set, status?: string | null) => {
    set(charactersFilterInputBaseAtom, (prev) => ({ ...prev, status }));
  }
);

const charactersFilterInputSpeciesSetterAtom = atom(
  null,
  (_get, set, species?: string | null) => {
    set(charactersFilterInputBaseAtom, (prev) => ({ ...prev, species }));
  }
);

const charactersFilterInputGenderSetterAtom = atom(
  null,
  (_get, set, gender?: string | null) => {
    set(charactersFilterInputBaseAtom, (prev) => ({ ...prev, gender }));
  }
);

const charactersFilterInputResetAtom = atom(null, (_get, set) =>
  set(charactersFilterInputBaseAtom, initialCharactersFilter)
);

export const charactersFilterInputGetterAtom = atom((get) =>
  get(charactersFilterInputBaseAtom)
);

export const charactersFilterInputDispatchAtom = atom(
  null,
  (_get, set, action: CharactersFilterAction) => {
    switch (action.type) {
      case CharactersFilterActionTypes.SET_NAME_FILTER:
        set(charactersFilterInputNameSetterAtom, action.payload);
        break;
      case CharactersFilterActionTypes.SET_SPECIES_FILTER:
        set(charactersFilterInputSpeciesSetterAtom, action.payload);
        break;
      case CharactersFilterActionTypes.SET_STATUS_FILTER:
        set(charactersFilterInputStatusSetterAtom, action.payload);
        break;
      case CharactersFilterActionTypes.SET_GENDER_FILTER:
        set(charactersFilterInputGenderSetterAtom, action.payload);
        break;
      case CharactersFilterActionTypes.RESET_FILTER:
        set(charactersFilterInputResetAtom);
        break;
      default:
        throw new Error("unknown action type");
    }
  }
);

export const charactersFilterActiveAtom = atom(
  (get) =>
    !shallowCompare(get(charactersFilterInputBaseAtom), initialCharactersFilter)
);
