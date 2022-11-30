import { Dispatch } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/types";

export const toggleBagButton = (status: boolean) => (dispatch: Dispatch) => {
    dispatch({
        type: ActionTypes.toggleBagAction,
        payload: !status
    })
}
