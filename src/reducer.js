import React from "react";
import { logOut } from "./App";

const LOAD_LAUNCHES = "LOAD_LAUNCHES";
const LOAD_DETAILS = "LOAD_DETAILS";
const SET_UPCOMING = "SET_UPCOMING";
const FILTER_BY_DATE = "FILTER_BY_DATE";
const HANDLE_LOGIN = "HANDLE_LOGIN";

const reducer = (state, action) => {
  if (action.type === HANDLE_LOGIN) {
    if (!action.data) {
      console.log(action.data);
      logOut();
      return {
        ...state,
        login: false,
      };
    } else {
      return {
        ...state,
        login: true,
      };
    }
  }
  if (action.type === LOAD_LAUNCHES) {
    return {
      ...state,
      launches: action.data.filter((x) => x.upcoming === state.upComing),
    };
  }
  if (action.type === LOAD_DETAILS) {
    return { ...state, details: action.data };
  }
  if (action.type === SET_UPCOMING) {
    console.log(action.data);
    return { ...state, upComing: action.data };
  }
  if (action.type === FILTER_BY_DATE) {
    console.log("data: ", action.data);
    let filteredLaunches = state.launches.filter((launch) =>
      action.data.includes(+launch.launch_year)
    );
    return { ...state, launches: filteredLaunches };
  }
  return state;
};

export default reducer;
