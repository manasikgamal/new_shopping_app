import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";

export interface currencyAction {
  type: ActionTypes.fetchCurrency,
  payload: cstate
}
export const currencyReducer = (state: cstate[]=[], action: currencyAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.fetchCurrency:
      return action.payload.data.currencies;
    default:
      return state;
  }
};
//////////////////////////////////////////////////
export interface cstate {
  symbol: string,
  label: string
}
export interface symbolAction {
  type: ActionTypes.currencySymbolAction,
  payload: string
}
export const currencySymbolReducer = (state: cstate = { symbol: "", label: "" }, action: symbolAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.currencySymbolAction:
      return action.payload;
    default:
      return state;
  }
}; 
