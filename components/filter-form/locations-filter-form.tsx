import { useAtom } from "jotai";

import { FilterForm } from "./filter-form";
import { useTimeout } from "../../lib/hooks";
import {
  locationsFilterActiveAtom,
  locationsFilterSetterAtom,
  locationsFilterInputDispatchAtom,
  locationsFilterInputGetterAtom,
  LocationsFilterActionTypes,
} from "../../lib/atoms";

function LocationsFilterForm({
  allResults,
  loadedResults,
}: {
  allResults?: number;
  loadedResults?: number;
}) {
  const [, setLocationsFilter] = useAtom(locationsFilterSetterAtom);
  const [locationsFilterIsActive] = useAtom(locationsFilterActiveAtom);
  const [locationsFilterInput] = useAtom(locationsFilterInputGetterAtom);
  const [, locationsFilterInputDispatch] = useAtom(
    locationsFilterInputDispatchAtom
  );

  const { startTimeout, stopTimeout } = useTimeout(() => setLocationsFilter());

  function handleInputChange(type: LocationsFilterActionTypes) {
    return (payload?: string | null) => {
      locationsFilterInputDispatch({
        type,
        payload,
      });
      startTimeout();
    };
  }

  function handleFilterReset() {
    locationsFilterInputDispatch({
      type: LocationsFilterActionTypes.RESET_FILTER,
    });
    stopTimeout();
    setLocationsFilter();
  }

  return (
    <FilterForm
      setFilter={() => null}
      onReset={handleFilterReset}
      filterIsActive={locationsFilterIsActive}
      allResults={allResults}
      loadedResults={loadedResults}
    >
      <FilterForm.Input
        name="name"
        onChange={handleInputChange(LocationsFilterActionTypes.SET_NAME_FILTER)}
        value={locationsFilterInput.name}
      />
      <FilterForm.Input
        name="type"
        onChange={handleInputChange(LocationsFilterActionTypes.SET_TYPE_FILTER)}
        value={locationsFilterInput.type}
      />
      <FilterForm.Input
        name="dimension"
        onChange={handleInputChange(
          LocationsFilterActionTypes.SET_DIMENSION_FILTER
        )}
        value={locationsFilterInput.dimension}
      />
    </FilterForm>
  );
}

export default LocationsFilterForm;
