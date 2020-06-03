import React, { FC, useEffect, useReducer } from "react";

import { HorseList } from "./HorseList";

import { Horse, State, Reducer, ACTION_TYPE } from "./types";

import "./App.css";

const initialState: State = {
  status: "idling",
  horses: [],
  page: 'horse-list', 
};

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_HORSES:
      return {
        ...state,
        status: "loading",
      };
    case ACTION_TYPE.FETCH_HORSES_SUCCESS:
      return {
        ...state,
        status: "loadingSuccess",
        horses: action.payload || state.horses,
      };
    case ACTION_TYPE.FETCH_HORSES_FAILURE:
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

  const handleFetchHorses = () => {
    dispatch({
      type: ACTION_TYPE.FETCH_HORSES,
    });

    fetchHorses()
      .then((horses: Horse[]) => {
        dispatch({
          type: ACTION_TYPE.FETCH_HORSES_SUCCESS,
          payload: horses,
        });
      })
      .catch((error) => {
        console.error(error);

        dispatch({
          type: ACTION_TYPE.FETCH_HORSES_FAILURE,
        });
      });
  };

  useEffect(() => {
    handleFetchHorses();
  }, []);

  useEffect(() => {
    if (status === 'loadingFailure') {
      alert('Can not load horses. Please see console message for details');
    }
  }, [status])

  const isLoadingHorses = status === 'loading';
  const isHorseList = page === 'horse-list';

  return (
    <main className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  );
};

function fetchHorses() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/horse`).then((result) => result.json());
}
