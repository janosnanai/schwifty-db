type CharactersFilterActionType = string;

type CharactersFilterAction =
  | {
      type: CharactersFilterActionTypes.SET_NAME_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharactersFilterActionTypes.SET_STATUS_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharactersFilterActionTypes.SET_SPECIES_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharactersFilterActionTypes.SET_TYPE_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharactersFilterActionTypes.SET_GENDER_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharactersFilterActionTypes.RESET_FILTER;
      payload?: InputMaybe<string>;
    };

type EpisodesFilterActionType = string;

type EpisodesFilterAction =
  | {
      type: EpisodesFilterActionTypes.SET_NAME_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: EpisodesFilterActionTypes.SET_EPISODE_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.RESET_FILTER;
      payload?: InputMaybe<string>;
    };

type LocationsFilterActionType = string;

type LocationsFilterAction =
  | {
      type: LocationsFilterActionTypes.SET_NAME_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: LocationsFilterActionTypes.SET_TYPE_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: LocationsFilterActionTypes.SET_DIMENSION_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.RESET_FILTER;
      payload?: InputMaybe<string>;
    };
