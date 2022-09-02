import { atom } from "jotai";

const loadingSpinnerBaseAtom = atom(false);

export const loadingSpinnerGetterAtom = atom((get) =>
  get(loadingSpinnerBaseAtom)
);

export const loadingSpinnerSetterAtom = atom(
  null,
  (get, set, value: boolean) => {
    if (get(loadingSpinnerBaseAtom) !== value) {
      set(loadingSpinnerBaseAtom, value);
    }
  }
);
