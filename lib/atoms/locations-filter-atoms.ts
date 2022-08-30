import type { FilterLocation } from "../../graphql/_generated";

import { atom } from "jotai";

import { shallowCompare } from "../helpers";

export enum LocationsFilterActionTypes {
  SET_NAME_FILTER,
  SET_TYPE_FILTER,
  SET_DIMENSION_FILTER,
  RESET_FILTER,
}

const initialLocationsFilter: FilterLocation = {
  name: "",
  type: "",
  dimension: "",
};

// live filter atoms

const locationsFilterBaseAtom = atom(initialLocationsFilter);

export const locationsFilterSetterAtom = atom(null, (get, set) => {
  const newFilter = get(locationsFilterInputGetterAtom);
  set(locationsFilterBaseAtom, newFilter);
});

export const locationsFilterGetterAtom = atom((get) =>
  get(locationsFilterBaseAtom)
);

// filter input atoms

const locationsFilterInputBaseAtom = atom(initialLocationsFilter);

const locationsFilterInputNameSetterAtom = atom(
  null,
  (_get, set, name?: string | null) => {
    set(locationsFilterInputBaseAtom, (prev) => ({ ...prev, name }));
  }
);

const locationsFilterInputTypeSetterAtom = atom(
  null,
  (_get, set, type?: string | null) => {
    set(locationsFilterInputBaseAtom, (prev) => ({ ...prev, type }));
  }
);

const locationsFilterInputDimensionSetterAtom = atom(
  null,
  (_get, set, dimension?: string | null) => {
    set(locationsFilterInputBaseAtom, (prev) => ({ ...prev, dimension }));
  }
);

const locationsFilterInputResetAtom = atom(null, (_get, set) =>
  set(locationsFilterInputBaseAtom, initialLocationsFilter)
);

export const locationsFilterInputGetterAtom = atom((get) =>
  get(locationsFilterInputBaseAtom)
);

export const locationsFilterInputDispatchAtom = atom(
  null,
  (_get, set, action: LocationsFilterAction) => {
    switch (action.type) {
      case LocationsFilterActionTypes.SET_NAME_FILTER:
        set(locationsFilterInputNameSetterAtom, action.payload);
        break;
      case LocationsFilterActionTypes.SET_TYPE_FILTER:
        set(locationsFilterInputTypeSetterAtom, action.payload);
        break;
      case LocationsFilterActionTypes.SET_DIMENSION_FILTER:
        set(locationsFilterInputDimensionSetterAtom, action.payload);
        break;
      case LocationsFilterActionTypes.RESET_FILTER:
        set(locationsFilterInputResetAtom);
        break;
      default:
        throw new Error("unknown action type");
    }
  }
);

export const locationsFilterActiveAtom = atom(
  (get) =>
    !shallowCompare(get(locationsFilterInputBaseAtom), initialLocationsFilter)
);
