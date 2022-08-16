import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { FilterCharacter } from "../../graphql/_generated";

import { useReducer } from "react";

function CharacterFilterMenu({
  onSubmit,
}: {
  onSubmit: Dispatch<SetStateAction<FilterCharacter>>;
}) {
  const [filterInput, dispatch] = useReducer(filterReducer, initialFilter);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(filterInput);
    // dispatch({ type: CharacterFilterActionTypes.RESET_FILTER });
  }

  function handleInputChange(type: CharacterFilterActionType) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type,
        payload: event.target.value,
      });
    };
  }

  return (
    <div className="px-9 py-5 space-y-3 text-slate-600">
      <form onSubmit={handleSubmit}>
        <div className="space-x-1">
          <input
            onChange={handleInputChange(
              CharacterFilterActionTypes.SET_NAME_FILTER
            )}
            className="border px-1"
            value={filterInput.name || ""}
            placeholder="filter by name..."
          />
          <input
            onChange={handleInputChange(
              CharacterFilterActionTypes.SET_STATUS_FILTER
            )}
            className="border px-1"
            value={filterInput.status || ""}
            placeholder="filter by status..."
          />
          <input
            onChange={handleInputChange(
              CharacterFilterActionTypes.SET_SPECIES_FILTER
            )}
            className="border px-1"
            value={filterInput.species || ""}
            placeholder="filter by species..."
          />
          <input
            onChange={handleInputChange(
              CharacterFilterActionTypes.SET_TYPE_FILTER
            )}
            className="border px-1"
            value={filterInput.type || ""}
            placeholder="filter by type..."
          />
          <input
            onChange={handleInputChange(
              CharacterFilterActionTypes.SET_GENDER_FILTER
            )}
            className="border px-1"
            value={filterInput.gender || ""}
            placeholder="filter by gender..."
          />
        </div>
        <button className="p-2 border">apply filter</button>
      </form>
    </div>
  );
}

export enum CharacterFilterActionTypes {
  SET_NAME_FILTER = "set_name_filter",
  SET_STATUS_FILTER = "set_status_filter",
  SET_SPECIES_FILTER = "set_species_filter",
  SET_TYPE_FILTER = "set_type_filter",
  SET_GENDER_FILTER = "set_gender_filter",
  RESET_FILTER = "reset_filter",
}

const initialFilter: FilterCharacter = {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
};

function filterReducer(state: FilterCharacter, action: CharacterFilterAction) {
  switch (action.type) {
    case CharacterFilterActionTypes.SET_NAME_FILTER:
      return { ...state, name: action.payload };
    case CharacterFilterActionTypes.SET_STATUS_FILTER:
      return { ...state, status: action.payload };
    case CharacterFilterActionTypes.SET_SPECIES_FILTER:
      return { ...state, species: action.payload };
    case CharacterFilterActionTypes.SET_TYPE_FILTER:
      return { ...state, type: action.payload };
    case CharacterFilterActionTypes.SET_GENDER_FILTER:
      return { ...state, gender: action.payload };
    case CharacterFilterActionTypes.RESET_FILTER:
      return initialFilter;
    default:
      return state;
  }
}

export default CharacterFilterMenu;
