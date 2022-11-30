import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../actions/types";
import { cstate } from "../reducers/currencyReducer";
import { headerstate } from "../reducers/headerReducer";
import { mstate } from "../reducers/messageReducer";

export interface Descriptioninterface {
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  category: string;
  description: string;
  gallery: [string]
  prices: Array<price>
  attributes: Array<AttributeSet>
  ctr: number,
  count: number,
}
export interface AttributeSet {
  id: string;
  name: string;
  items: Array<ItemSet>
  choose: string,
  key: number
}
export interface ItemSet {
  id: string;
  value: string;
}
export interface price {
  currency: string
  amount: number
}
export interface RootState {
  products: Descriptioninterface[];
  description: Descriptioninterface;
  message: mstate
  cartitems: Descriptioninterface[];
  currencies: string[];
  header: headerstate;
  currencytype: cstate
}
export interface FetchDescriptionAction {
  type: ActionTypes.fetchDescription,
  payload: Descriptioninterface
}
export interface setKeyAction {
  type: ActionTypes.addToCartAction,
  payload: number
}
export const fetchDescription = (id: string) => async (dispatch: Dispatch) => {
  return await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
          query getdescription($id:String!){
            product(id:$id){
                id
                name
                brand
                inStock
                category
                gallery
                description
                prices {
                  currency
                  amount
                }
                attributes{
                  id
                  name
                  items{
                    id
                    value
                  }
                }
              }  }
            `,
      variables: { id: id }
    }
  }).then((result) => {
    dispatch<FetchDescriptionAction>({
      type: ActionTypes.fetchDescription,
      payload: result.data
    })
  });
}