import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";

export interface currencyAction {
  type: ActionTypes.fetchCurrency,
  payload: string[]
}
export const currencyReducer = (state: string[] = [], action: currencyAction | AnyAction) => {
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
  name: string
}
export interface symbolAction {
  type: ActionTypes.currencySymbolAction,
  payload: string
}
export const currencySymbolReducer = (state: cstate = { symbol: "", name: "" }, action: symbolAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.currencySymbolAction:
      return action.payload;
    default:
      return state;
  }
}; 
