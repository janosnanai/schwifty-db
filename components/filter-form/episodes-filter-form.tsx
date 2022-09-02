import { useAtom } from "jotai";

import { FilterForm } from "./filter-form";
import { useTimeout } from "../../lib/hooks";
import {
  episodesFilterActiveAtom,
  episodesFilterSetterAtom,
  episodesFilterInputDispatchAtom,
  episodesFilterInputGetterAtom,
  EpisodesFilterActionTypes,
} from "../../lib/atoms";

function EpisodesFilterForm({
  allResults,
  loadedResults,
}: {
  allResults?: number;
  loadedResults?: number;
}) {
  const [, setEpisodesFilter] = useAtom(episodesFilterSetterAtom);
  const [episodesFilterIsActive] = useAtom(episodesFilterActiveAtom);
  const [episodesFilterInput] = useAtom(episodesFilterInputGetterAtom);
  const [, episodesFilterInputDispatch] = useAtom(
    episodesFilterInputDispatchAtom
  );

  const { startTimeout, stopTimeout } = useTimeout(() => setEpisodesFilter());

  function handleInputChange(type: EpisodesFilterActionTypes) {
    return (payload?: string | null) => {
      episodesFilterInputDispatch({
        type,
        payload,
      });
      startTimeout();
    };
  }

  function handleFilterReset() {
    episodesFilterInputDispatch({
      type: EpisodesFilterActionTypes.RESET_FILTER,
    });
    stopTimeout();
    setEpisodesFilter();
  }

  return (
    <FilterForm
      setFilter={() => null}
      onReset={handleFilterReset}
      filterIsActive={episodesFilterIsActive}
      allResults={allResults}
      loadedResults={loadedResults}
    >
      <FilterForm.Input
        name="name"
        onChange={handleInputChange(EpisodesFilterActionTypes.SET_NAME_FILTER)}
        value={episodesFilterInput.name}
      />
      <FilterForm.Input
        name="episode"
        onChange={handleInputChange(
          EpisodesFilterActionTypes.SET_EPISODE_FILTER
        )}
        value={episodesFilterInput.episode}
      />
    </FilterForm>
  );
}

export default EpisodesFilterForm;
