export type Status = "idling" | "loading" | "loadingSuccess" | "loadingFailure" | "saving" | "savingSuccess" | "savingFailure";

export type Page = "horse-list" | "edit-horse" | "create-horse";

export type Horse = {
  id: string;
  name: string;
  profile: {
    favouriteFood?: string;
    physical: {
      height?: number | null;
      weight?: number | null;
    };
  };
};

export type State = {
  status: Status;
  horses: Horse[];
  page: Page;
};

export const ACTION_TYPE = {
  FETCH_HORSES: "FETCH_HORSES",
  FETCH_HORSES_SUCCESS: "FETCH_HORSES_SUCCESS",
  FETCH_HORSES_FAILURE: "FETCH_HORSES_FAILURE",
} as const;

type FetchHorsesAction = {
  type: "FETCH_HORSES" | "FETCH_HORSES_SUCCESS" | "FETCH_HORSES_FAILURE";
  payload?: Horse[];
};

type PageAction = {
  type: "LIST_PAGE" | "CREATE_PAGE" | "EDIT_PAGE";
};

type CreateHorseAction = {
  type: "CREATE_HORSE" | "CREATE_HORSE_SUCCESS" | "CREATE_HORSE_FAILURE";
}

type Action = FetchHorsesAction | PageAction | CreateHorseAction;

export type Reducer = (state: State, action: Action) => State;

export const FieldName = {
  HorseName: "horseName",
  FavouriteFood: "favouriteFood",
  Height: "height",
  Weight: "weight",
} as const;

export type FormValues = {
  [FieldName.HorseName]: string;
  [FieldName.FavouriteFood]?: string;
  [FieldName.Height]?: string;
  [FieldName.Weight]?: string;
};
