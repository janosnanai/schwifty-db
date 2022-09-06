import { Fragment } from "react";
import { createPortal } from "react-dom";
import { useAtom } from "jotai";
import { Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { useIsMounted } from "../../lib/hooks";
import {
  errorBannerMessageGetterAtom,
  errorBannerShowGetterAtom,
  errorBannerShowSetterAtom,
} from "../../lib/atoms";

function ErrorBanner({ refetch }: { refetch: () => void }) {
  const [show] = useAtom(errorBannerShowGetterAtom);
  const [message] = useAtom(errorBannerMessageGetterAtom);
  const [, setShow] = useAtom(errorBannerShowSetterAtom);
  const isMounted = useIsMounted();

  let bannerRoot: HTMLElement | null = null;

  if (!isMounted) return null;

  bannerRoot = document.getElementById("banner-root");

  return createPortal(
    <Transition
      as={Fragment}
      appear
      show={show}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 -translate-x-20"
      enterTo="opacity-100 translate-x-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 -translate-x-20"
    >
      <div className="fixed top-24 left-5 w-52 max-h-48 p-3 space-y-3 bg-zinc-700 text-zinc-50 rounded-lg shadow-md z-10">
        <ExclamationCircleIcon className="w-6 h-6" />
        <p>{message || "unknown error"}</p>
        <div className="flex justify-between py-2">
          <button
            onClick={refetch}
            className="text-red-500 hover:text-red-400 uppercase"
          >
            retry
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-red-500 hover:text-red-400 uppercase"
          >
            dismiss
          </button>
        </div>
      </div>
    </Transition>,
    bannerRoot!
  );
}

export default ErrorBanner;
