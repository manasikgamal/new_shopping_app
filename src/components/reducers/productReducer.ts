import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";
import { Descriptioninterface } from "../services/descriptionservices";
import { FetchProductsAction } from "../services/productsServices";


export const ProductReducer = (state: Descriptioninterface[] = [], action: FetchProductsAction | AnyAction) => {
  switch (action.type) {
    case ActionTypes.fetchProducts:
      return action.payload.data.category.products;
    default:
      return state;
  }
};
