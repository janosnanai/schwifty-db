import { atom } from "jotai";

const errorBannerBaseAtom = atom({ message: "", show: false });

export const errorBannerMessageGetterAtom = atom(
  (get) => get(errorBannerBaseAtom).message
);

export const errorBannerShowGetterAtom = atom(
  (get) => get(errorBannerBaseAtom).show
);

export const errorBannerMessageSetterAtom = atom(
  null,
  (_get, set, message: string) =>
    set(errorBannerBaseAtom, (prev) => ({ ...prev, message }))
);

export const errorBannerShowSetterAtom = atom(
  null,
  (_get, set, show: boolean) =>
    set(errorBannerBaseAtom, (prev) => ({ ...prev, show }))
);
