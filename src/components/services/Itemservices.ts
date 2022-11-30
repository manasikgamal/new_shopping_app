import { Dispatch } from 'redux';
import { ActionTypes } from '../actions/types';
import { Descriptioninterface } from './descriptionservices'

export const getItems = (productobj: Descriptioninterface, itemName: string, itemValue: string, key: number) => (dispatch: Dispatch) => {
  if (productobj.inStock) {
    const productobj2 = { ...productobj, ctr: 0, attributes: productobj.attributes.map(a => a.id === a.id ? { ...a, key: -1 } : a) }
    const items = localStorage.getItem("items")
    let product = productobj2;
    if (typeof items === 'string') {
      product = JSON.parse(items);
    }
    product.attributes.forEach(x => {
      if (x.id === itemName && x.key === -1) {
        product.ctr++;
      }
    })
    const choose = { ...product, attributes: product.attributes.map(a => a.id === itemName ? { ...a, choose: itemValue, key: key } : a) }
    localStorage.setItem("items", JSON.stringify(choose))
    dispatch({
      type: ActionTypes.getItemAction,
      payload: choose
    })
  }
  else {
    dispatch({
      type: ActionTypes.setMessage,
      payload: "unable to add out-stock product"
    })
  }
}
export const resetKey = (productobj: Descriptioninterface) => (dispatch: Dispatch) => {
  const productobj2 = { ...productobj, ctr: 0, attributes: productobj.attributes.map(a => a.id === a.id ? { ...a, key: -1 } : a) }
  dispatch({
    type: ActionTypes.restKey,
    payload: productobj2
  })
}
export const addTocart = (product: Descriptioninterface) => (dispatch: Dispatch) => {
  const newproduct = { ...product, attributes: product.attributes.map(p => p.choose ? { ...p } : { ...p, choose: p.items[0].value }) }
  const item = localStorage.getItem('cartitems')
  let cartitems = []
  if (typeof item === 'string')
    cartitems = JSON.parse(item);
  let alreadyincart = false;
  cartitems.forEach((item: any) => {
    if (item.id === newproduct.id) {
      const pro = newproduct.attributes.map((p) => p.choose);
      const mno = item.attributes.map((a: any) => a.choose);
      if (JSON.stringify(mno) === JSON.stringify(pro)) {
        item.count++;
        alreadyincart = true;
      }
    }
  });
  if (!alreadyincart) {
    cartitems.push({ ...newproduct, count: 1 });
  }
  localStorage.setItem("cartitems", JSON.stringify(cartitems));
  localStorage.removeItem("items");
  dispatch({
    type: ActionTypes.addToCartAction,
    payload: cartitems
  })
};
export const removeFromcart = (product: Descriptioninterface) => (dispatch: Dispatch) => {
  let cartitems = localStorage.getItem("cartitems") ?
    JSON.parse(localStorage.getItem("cartitems") || '') : []
  let alreadyincart = false;
  cartitems.forEach((item: any) => {
    if (item.id === product.id) {
      const pro = product.attributes.map((p) => p.choose);
      const mno = item.attributes.map((a: any) => a.choose);
      if (JSON.stringify(mno) === JSON.stringify(pro)) {
        if (item.count === 1) {
          cartitems = cartitems?.filter((x: any) => x !== item)
        }
        else {
          const index = cartitems.findIndex((x: any) => x === item)
          cartitems = [...cartitems.slice(0, index), { ...item, count: item.count - 1 }, ...cartitems.slice(index + 1)]
        }
      }
    }
  });
  localStorage.setItem("cartitems", JSON.stringify(cartitems));
  dispatch({
    type: ActionTypes.removeFromcartAction,
    payload: cartitems
  })
}
export const clearMessage = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.clearMessage
  })
}
export const fetchCartitems = () => (dispatch: Dispatch) => {
  const cartitems = localStorage.getItem("cartitems") ?
    JSON.parse(localStorage.getItem("cartitems") || '') : []
  dispatch({
    type: ActionTypes.fetchCartitems,
    payload: cartitems
  })
}