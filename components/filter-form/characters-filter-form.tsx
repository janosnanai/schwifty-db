import { useAtom } from "jotai";

import { FilterForm } from "./filter-form";
import { useTimeout } from "../../lib/hooks";
import {
  charactersFilterActiveAtom,
  charactersFilterSetterAtom,
  charactersFilterInputDispatchAtom,
  charactersFilterInputGetterAtom,
  CharactersFilterActionTypes,
} from "../../lib/atoms";
import {
  CHARACTER_STATUS_OPTIONS,
  CHARACTER_GENDER_OPTIONS,
} from "../../lib/constants";

function CharactersFilterForm({
  allResults,
  loadedResults,
}: {
  allResults?: number;
  loadedResults?: number;
}) {
  const [, setCharactersFilter] = useAtom(charactersFilterSetterAtom);
  const [charactersFilterIsActive] = useAtom(charactersFilterActiveAtom);
  const [charactersFilterInput] = useAtom(charactersFilterInputGetterAtom);
  const [, charactersFilterInputDispatch] = useAtom(
    charactersFilterInputDispatchAtom
  );

  const { startTimeout, stopTimeout } = useTimeout(() => setCharactersFilter());

  function handleInputChange(type: CharactersFilterActionTypes) {
    return (payload?: string | null) => {
      charactersFilterInputDispatch({
        type,
        payload,
      });
      startTimeout();
    };
  }

  function handleFilterReset() {
    charactersFilterInputDispatch({
      type: CharactersFilterActionTypes.RESET_FILTER,
    });
    stopTimeout();
    setCharactersFilter();
  }

  return (
    <FilterForm
      setFilter={() => null}
      onReset={handleFilterReset}
      filterIsActive={charactersFilterIsActive}
      allResults={allResults}
      loadedResults={loadedResults}
    >
      <FilterForm.Input
        name="name"
        onChange={handleInputChange(
          CharactersFilterActionTypes.SET_NAME_FILTER
        )}
        value={charactersFilterInput.name}
      />
      <FilterForm.Input
        name="species"
        onChange={handleInputChange(
          CharactersFilterActionTypes.SET_SPECIES_FILTER
        )}
        value={charactersFilterInput.species}
      />
      <FilterForm.Select
        name="gender"
        onChange={handleInputChange(
          CharactersFilterActionTypes.SET_GENDER_FILTER
        )}
        value={charactersFilterInput.gender}
        options={CHARACTER_GENDER_OPTIONS}
      />
      <FilterForm.Select
        name="status"
        onChange={handleInputChange(
          CharactersFilterActionTypes.SET_STATUS_FILTER
        )}
        value={charactersFilterInput.status}
        options={CHARACTER_STATUS_OPTIONS}
      />
    </FilterForm>
  );
}

export default CharactersFilterForm;
