export type Status = 'idling' | 'loading' | 'loadingSuccess' | 'loadingFailure';

export type Page = 'horse-list' | 'horse';

export type Horse = {
  id: string;
  name: string;
  profile: {
    favouriteFood: string;
    physical: {
      height: number;
      weight: number;
    }
  }
};

export type State = {
  status: Status;
  horses: Horse[];
  page: Page,
};

export const ACTION_TYPE = {
  FETCH_HORSES: 'FETCH_HORSES',
  FETCH_HORSES_SUCCESS: 'FETCH_HORSES_SUCCESS',
  FETCH_HORSES_FAILURE: 'FETCH_HORSES_FAILURE',
} as const;

type FetchHorsesAction = {
  type: typeof ACTION_TYPE[keyof typeof ACTION_TYPE];
  payload?: Horse[];
};

type Action = FetchHorsesAction;

export type Reducer = (state: State, action: Action) => State;
