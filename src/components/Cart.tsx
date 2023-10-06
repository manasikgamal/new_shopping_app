import React, { Component } from "react";
import { connect } from "react-redux";
import ImagesGallery from "./ImagesGallery";
import Price from "./Price";
import {
  Descriptioninterface,
  RootState,
} from "./services/descriptionservices";
import {
  addTocart,
  fetchCartitems,
  removeFromcart,
} from "./services/Itemservices";
import "./Cart.css";

interface Cprops {
  cartitems: Array<Descriptioninterface>;
  fetchCartitems: () => void;
  addTocart: (product: Descriptioninterface) => void;
  removeFromcart: (product: Descriptioninterface) => void;
}
class Cart extends Component<Cprops, {}> {
  render() {
    const { cartitems } = this.props;
    return (
      <div className="cart_try">
        {cartitems.length==0? <p className="senBag">THE BAG IS EMPTY</p>:cartitems.map((item, index) => (
          <div key={index} className="cart_container">
            <div className="cart_left">
              <h3>{item.name}</h3>
              <h3>{item.brand}</h3>
              <h3>
                <Price prices={item.prices} />
              </h3>
              <div>
                {item.attributes.map((x, index) => (
                  <div className="bagbody_choose">
                    <div className="cart_name">{x.id}</div>
                    <p
                      key={index}
                      style={{
                        backgroundColor: x.id === "Color" ? x.choose : "",
                        padding: x.id === "Color" ? "15px 25px" : "",
                      }}
                    >
                      {x.id === "Color" ? "" : x.choose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="cart_two_div">
              <div className="cart_center">
                <div
                  className="bagbody_plus"
                  onClick={() => this.props.addTocart(item)}
                >
                  +
                </div>
                <div className="bagbody_count">{item.count}</div>
                <div
                  className="bagbody_minus"
                  onClick={() => this.props.removeFromcart(item)}
                >
                  -
                </div>
              </div>
              <div className="cart_right">
                <ImagesGallery gallery={item.gallery} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    cartitems: state.cartitems,
  };
}
export default connect(mapStateToProps, {
  fetchCartitems,
  addTocart,
  removeFromcart,
})(Cart);
