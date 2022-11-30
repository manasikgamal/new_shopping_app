import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../actions/types";
import { Descriptioninterface } from "./descriptionservices";

export interface FetchProductsAction {
  type: ActionTypes.fetchProducts,
  payload: Descriptioninterface[]
}
export const fetchData = (title: string) => async (dispatch: Dispatch) => {
  return await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
          query getproducts($title:String!){
            category(input:{title:$title}){
                products{
                    id
                    name
                    brand
                    inStock
                    category
                    gallery
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
                   }
            }    }
            `,
      variables: { title: title }
    }
  }).then((result) => {
    dispatch<FetchProductsAction>({
      type: ActionTypes.fetchProducts,
      payload: result.data
    })
  });
}