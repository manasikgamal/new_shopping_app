import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";
import { Descriptioninterface, FetchDescriptionAction } from "../services/descriptionservices";

export const descriptionReducer = (state: Descriptioninterface = {} as Descriptioninterface, action: FetchDescriptionAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.fetchDescription:
      return action.payload.data.product;
    case ActionTypes.getItemAction:
      return action.payload;
    case ActionTypes.restKey:
      return action.payload;
    default:
      return state;
  }
}; 
