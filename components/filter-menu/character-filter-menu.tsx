import type { ChangeEvent, FormEvent } from "react";

import { useAtom } from "jotai";

import { useTimeout } from "../../lib/hooks";
import {
  charactersFilterAtom,
  charactersFilterInputReducerAtom,
  CharactersFilterActionTypes,
} from "../../lib/atoms";

function CharacterFilterMenu() {
  const [_charactersFilter, setCharactersFilter] =
    useAtom(charactersFilterAtom);
  const [filterInput, dispatch] = useAtom(charactersFilterInputReducerAtom);
  const {
    startTimeout,
    stopTimeout,
    isActive: isTimeoutActive,
  } = useTimeout(() => setCharactersFilter(filterInput), 300);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    stopTimeout();
    setCharactersFilter(filterInput);
  }

  function handleInputChange(type: CharactersFilterActionTypes) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type,
        payload: event.target.value,
      });
      startTimeout();
    };
  }

  function handleFilterReset() {
    dispatch({
      type: CharactersFilterActionTypes.RESET_FILTER,
    });
    startTimeout();
  }

  return (
    <div className="px-9 py-5 space-y-3 text-slate-600 bg-slate-50 w-72">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_NAME_FILTER
            )}
            className="border px-1"
            value={filterInput.name || ""}
            placeholder="filter by name..."
          />
          <input
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_STATUS_FILTER
            )}
            className="border px-1"
            value={filterInput.status || ""}
            placeholder="filter by status..."
          />
          <input
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_SPECIES_FILTER
            )}
            className="border px-1"
            value={filterInput.species || ""}
            placeholder="filter by species..."
          />
          <input
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_TYPE_FILTER
            )}
            className="border px-1"
            value={filterInput.type || ""}
            placeholder="filter by type..."
          />
          <input
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_GENDER_FILTER
            )}
            className="border px-1"
            value={filterInput.gender || ""}
            placeholder="filter by gender..."
          />
        </div>
        <button
          type="button"
          className="p-2 border"
          onClick={handleFilterReset}
        >
          clear filters
        </button>
        <div>
          <p>{`timer is ${isTimeoutActive ? "active" : "inactive"}`}</p>
        </div>
      </form>
    </div>
  );
}

export default CharacterFilterMenu;
