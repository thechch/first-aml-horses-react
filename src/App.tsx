import React, { FC, useReducer } from "react";

import { HorseList } from "./HorseList";

import { Horse, State, Reducer } from "./types";

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
    default:
      console.error(`No handler found for dispatched action ${action.type}`);
      return state;
  }
};

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, horses, page } = state;
  const isHorseListPage = page === "horse-list";
  const isHorsePage = page === "horse";

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

  return (
    <main className="App">
      {isHorseListPage && (
        <HorseList
          horses={horses}
          status={status}
          fetchHorses={handleFetchHorses}
        />
      )}
    </main>
  );
};

function fetchHorses() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/horse`).then((result) =>
    result.json()
  );
}
