import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { ActionTypes } from "../actions/types";

export const currencySymbol = (currency_name: string) => (dispatch: Dispatch) => {
    var currency_symbols: { [key: string]: string } = {
        'USD': '$', // US Dollar
        'GBP': '£', // British Pound Sterling
        'JPY': '¥', // Japanese Yen
        'RUB': '₽',
        'AUD': '$'
    };
    if (currency_symbols[currency_name] !== undefined) {
        dispatch({
            type: ActionTypes.currencySymbolAction,
            payload: { symbol: currency_symbols[currency_name], name: currency_name }
        })
        localStorage.setItem("currency", JSON.stringify(currency_name));
    }
}

export const getCurrencies = () => async (dispatch: Dispatch) => {
    return await axios({
        url: 'http://localhost:4000/',
        method: 'post',
        data: {
            query: `
          query getcurrencies{
            currencies
         }`
        }
    }).then((result) => {
        dispatch({
            type: ActionTypes.fetchCurrency,
            payload: result.data
        })
    })
}

export const currencylocalSymbol = (currency_name: string): string => {
    var currency_symbols: { [key: string]: string } = {
        'USD': '$', // US Dollar
        'GBP': '£', // British Pound Sterling
        'JPY': '¥', // Japanese Yen
        'RUB': '₽',
        'AUD': '$'
    };
    if (currency_symbols[currency_name] !== undefined) {
        return currency_symbols[currency_name]
    }
    return 'no'
}