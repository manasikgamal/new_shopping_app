import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";

export interface mstate {
  message: string
}
export interface messageAction {
  type: ActionTypes.setMessage,
  payload: string
}
export const messageReducer = (state: mstate = { message: "" }, action: messageAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.setMessage:
      return { ...state, message: action.payload };
    case ActionTypes.clearMessage:
      return { ...state, message: "" }
    default:
      return state;
  }
}; 