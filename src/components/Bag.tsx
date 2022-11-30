import React, { Component } from "react";
import { connect } from "react-redux";
import "./Bag.css";
import BagBody from "./BagBody";
import { cstate } from "./reducers/currencyReducer";
import {
  Descriptioninterface,
  RootState,
} from "./services/descriptionservices";
import {
  addTocart,
  fetchCartitems,
  removeFromcart,
} from "./services/Itemservices";

interface Bprops {
  cartitems: Array<Descriptioninterface>;
  fetchCartitems: () => void;
  addTocart: (product: Descriptioninterface) => void;
  removeFromcart: (product: Descriptioninterface) => void;
  currencytype: cstate;
}
class Bag extends Component<Bprops, {}> {
  componentDidMount(): void {
    this.props.fetchCartitems();
  }
  render() {
    const { cartitems } = this.props;
    const { currencytype } = this.props;
    return (
      <div
        className={
          cartitems.length > 2 ? "bag_container bag_scroll" : "bag_container"
        }
      >
        <div className="bag_title">
          <h3>My Bag ,</h3>
          <span>{cartitems.reduce((a, c) => a + c.count, 0)} items</span>
        </div>
        {cartitems.map((item: any, index: any) => (
          <BagBody
            addTocart={this.props.addTocart}
            removeFromcart={this.props.removeFromcart}
            item={item}
            key={index}
          />
        ))}
        <div className="bag_total">
          <h3>Total</h3>
          <h3>
            {currencytype.symbol}
            {cartitems
              .reduce((a, c) => a + c.prices[0].amount * c.count, 0)
              .toFixed(2)}
          </h3>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    cartitems: state.cartitems,
    currencytype: state.currencytype,
  };
}
export default connect(mapStateToProps, {
  fetchCartitems,
  addTocart,
  removeFromcart,
})(Bag);
