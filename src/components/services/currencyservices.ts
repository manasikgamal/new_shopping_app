import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { ActionTypes } from "../actions/types";
import { cstate } from "../reducers/currencyReducer";

export const currencySymbol = (currency_name: cstate) => (dispatch: Dispatch) => {
        dispatch({
            type: ActionTypes.currencySymbolAction,
            payload: currency_name
        })
        localStorage.setItem("currency", JSON.stringify(currency_name));
}
export const getCurrencies = () => async (dispatch: Dispatch) => {
    return await axios({
        url: 'http://localhost:4000/',
        method: 'post',
        data: {
            query: `
          query getcurrencies{
            currencies{
                label
                symbol
              }
         }`
        }
    }).then((result) => {
        dispatch({
            type: ActionTypes.fetchCurrency,
            payload: result.data
        })
    })
}

//export const currencylocalSymbol = (currency_name: string): string => {
//     var currency_symbols: { [key: string]: string } = {
//         'USD': '$', // US Dollar
//         'GBP': '£', // British Pound Sterling
//         'JPY': '¥', // Japanese Yen
//         'RUB': '₽',
//         'AUD': '$'
//     };
//     if (currency_symbols[currency_name] !== undefined) {
//         return currency_symbols[currency_name]
//     }
//     return 'no'
// }
