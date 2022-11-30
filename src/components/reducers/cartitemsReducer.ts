import { AnyAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";
import { Descriptioninterface } from "../services/descriptionservices";

export interface cartitemsAction {
  type: ActionTypes.fetchCartitems,
  payload: Descriptioninterface[]
}
export const cartitemsReducer = (state: Descriptioninterface[] = [], action: cartitemsAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.addToCartAction:
      return action.payload;
    case ActionTypes.fetchCartitems:
      return action.payload;
    case ActionTypes.removeFromcartAction:
      return action.payload;
    default:
      return state;
  }
}; 