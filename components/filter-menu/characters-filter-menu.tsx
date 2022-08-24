import type { FormEvent } from "react";

import { useAtom } from "jotai";

import FilterInput from "./parts/filter-input";
import FilterSelect from "./parts/filter-select";
import FilterMenu from "./parts/filter-menu";
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

function CharactersFilterMenu() {
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
    <FilterMenu
      onSubmit={handleSubmit}
      onReset={handleFilterReset}
      filterIsActive={filterIsActive}
    >
      <>
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
      </>
    </FilterMenu>
  );
}

export default CharactersFilterMenu;
