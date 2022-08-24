import type { FormEvent } from "react";

import { useAtom } from "jotai";
import { FilterIcon, XIcon } from "@heroicons/react/outline";

import FilterInput from "./filter-input";
import FilterSelect from "./filter-select";
import { useTimeout } from "../../lib/hooks";
import {
  charactersFilterAtom,
  charactersFilterActiveAtom,
  charactersFilterInputReducerAtom,
  CharactersFilterActionTypes,
} from "../../lib/atoms";
import {
  CHARACTER_STATUS_OPTIONS,
  CHARACTER_GENDER_OPTIONS,
} from "../../lib/constants";

function CharacterFilterMenu() {
  const [_charactersFilter, setCharactersFilter] =
    useAtom(charactersFilterAtom);
  const [filterIsActive] = useAtom(charactersFilterActiveAtom);
  const [filterInput, dispatch] = useAtom(charactersFilterInputReducerAtom);
  const { startTimeout, stopTimeout } = useTimeout(
    () => setCharactersFilter(filterInput),
    300
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    stopTimeout();
    setCharactersFilter(filterInput);
  }

  function handleInputChange(type: CharactersFilterActionTypes) {
    return (payload: string) => {
      dispatch({
        type,
        payload,
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
    <div className="relative px-9 pt-4 pb-6 rounded-lg text-emerald-300 bg-slate-100/75 dark:bg-slate-900/90 w-72">
      <h2 className="text-2xl mb-3">Filters</h2>
      {filterIsActive && (
        <div className="absolute bottom-3 right-2">
          <button
            type="button"
            className="relative h-11 w-11 rounded-full bg-red-500 hover:bg-red-400 text-slate-900"
            onClick={handleFilterReset}
          >
            <FilterIcon className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 mr-[1px] w-6 h-6" />
            <XIcon className="absolute bottom-1.5 right-1.5 w-4 h-4" />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex flex-col gap-2">
          <FilterInput
            name="name"
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_NAME_FILTER
            )}
            value={filterInput.name}
          />
          <FilterInput
            name="species"
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_SPECIES_FILTER
            )}
            value={filterInput.species}
          />
          <FilterSelect
            name="gender"
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_GENDER_FILTER
            )}
            value={filterInput.gender}
            options={CHARACTER_GENDER_OPTIONS}
          />
          <FilterSelect
            name="status"
            onChange={handleInputChange(
              CharactersFilterActionTypes.SET_STATUS_FILTER
            )}
            value={filterInput.status}
            options={CHARACTER_STATUS_OPTIONS}
          />
        </div>
      </form>
    </div>
  );
}

export default CharacterFilterMenu;
