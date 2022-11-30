import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";

interface headerAction {
  type: ActionTypes.toggleBagAction,
  payload: boolean
}
export interface headerstate {
  togglebage: boolean
}
export const HeaderReducer = (state: headerstate = { togglebage: false }, action: headerAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.toggleBagAction:
      return { ...state, togglebage: action.payload };
    default:
      return state;
  }
}; 