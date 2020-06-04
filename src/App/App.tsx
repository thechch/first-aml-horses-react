import React, { FC, useReducer, useCallback } from "react";

import { HorseList } from "../HorseList";
import { CreateHorse } from "../CreateHorse";

import { Horse, State, Reducer, FormValues } from "../types";

import "./App.css";

const initialState: State = {
  status: "idling",
  horses: [],
  page: "horse-list",
};

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_HORSES":
      return {
        ...state,
        status: "loading",
      };
    case "FETCH_HORSES_SUCCESS":
      return {
        ...state,
        status: "loadingSuccess",
        horses: action.payload || state.horses,
      };
    case "FETCH_HORSES_FAILURE":
      return {
        ...state,
        status: "loadingFailure",
      };
    case "CREATE_PAGE":
      return {
        ...state,
        page: "create-horse",
      };
    case "LIST_PAGE":
      return {
        ...state,
        page: "horse-list",
      };
    case "CREATE_HORSE":
      return {
        ...state,
        status: "saving",
      };
    case "CREATE_HORSE_SUCCESS":
      return {
        ...state,
        status: "savingSuccess",
      };
    case "CREATE_HORSE_FAILURE":
      return {
        ...state,
        status: "savingFailure",
      };
    default:
      console.error(`No handler found for dispatched action ${action.type}`);
      return state;
  }
};

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, horses, page } = state;
  const isHorseListPage = page === "horse-list";
  const isCreatePage = page === "create-horse";
  const isEditPage = page === "edit-horse";

  const routing = {
    goToCreatePage: () => dispatch({ type: "CREATE_PAGE" }),
    goToListPage: () => dispatch({ type: "LIST_PAGE" }),
  };

  const handleFetchHorses = () => {
    dispatch({
      type: "FETCH_HORSES",
    });

    fetchHorses()
      .then((horses: Horse[]) => {
        dispatch({
          type: "FETCH_HORSES_SUCCESS",
          payload: horses,
        });
      })
      .catch((error) => {
        console.error(error);

        dispatch({
          type: "FETCH_HORSES_FAILURE",
        });
      });
  };

  const handleFetchHorsesCallback = useCallback(handleFetchHorses, []);

  const handleCreateHorse = (formData: FormValues) => {
    dispatch({
      type: "CREATE_HORSE",
    });

    createHorse(formData)
      .then(() => {
        dispatch({ type: "CREATE_HORSE_SUCCESS" });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: "CREATE_HORSE_FAILURE",
        });
      });
  };

  return (
    <main className="App">
      {isHorseListPage && (
        <HorseList
          horses={horses}
          status={status}
          fetchHorses={handleFetchHorsesCallback}
          routing={routing}
        />
      )}
      {isCreatePage && (
        <CreateHorse
          status={status}
          createHorse={handleCreateHorse}
          routing={routing}
        />
      )}
    </main>
  );
};

function fetchHorses() {
  return window
    .fetch(`${process.env.REACT_APP_BASE_URL}/horse`)
    .then((result) => result.json());
}

function createHorse(formValues: FormValues) {
  const { horseName, favouriteFood, height, weight } = formValues;

  const horsePayload: Omit<Horse, "id"> = {
    name: horseName,
    profile: {
      favouriteFood,
      physical: {
        height: height ? Number.parseFloat(height) : null,
        weight: weight ? Number.parseFloat(weight) : null,
      },
    },
  };

  return window
    .fetch(`${process.env.REACT_APP_BASE_URL}/horse`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(horsePayload),
    })
    .then((result) => result.json());
}
