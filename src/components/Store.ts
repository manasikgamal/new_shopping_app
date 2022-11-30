import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartitemsReducer } from './reducers/cartitemsReducer';
import { currencyReducer, currencySymbolReducer } from './reducers/currencyReducer';
import { descriptionReducer } from './reducers/descriptionReducer';
import { HeaderReducer } from './reducers/headerReducer';
import { messageReducer } from './reducers/messageReducer';
import { ProductReducer } from './reducers/productReducer';


const store = configureStore({
  reducer: {
    products: ProductReducer,
    description: descriptionReducer,
    message: messageReducer,
    cartitems: cartitemsReducer,
    currencies: currencyReducer,
    header: HeaderReducer,
    currencytype: currencySymbolReducer
  },
})


export default store