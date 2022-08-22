type CharacterFilterActionType = string;

type CharacterFilterAction =
  | {
      type: CharacterFilterActionTypes.SET_NAME_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.SET_STATUS_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.SET_SPECIES_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.SET_TYPE_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.SET_GENDER_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.RESET_FILTER;
      payload?: InputMaybe<string>;
    }
  | {
      type: CharacterFilterActionTypes.SYNC_FILTER;
      payload?: InputMaybe<{}>;
    };
