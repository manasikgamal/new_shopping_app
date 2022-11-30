import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import Price from "./Price";
import {
  Descriptioninterface,
  RootState,
} from "./services/descriptionservices";
import { addTocart } from "./services/Itemservices";

interface Pprops {
  product: Descriptioninterface;
  navigate: NavigateFunction;
  cartitems?: Array<Descriptioninterface>;
  addTocart: (product: Descriptioninterface) => void;
}
interface Pstate {
  hover: boolean;
}
class ProductCard extends Component<Pprops, Pstate> {
  constructor(props: Pprops) {
    super(props);
    this.state = { hover: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (id: string) => {
    this.props.navigate(`/description/${id}`);
  };
  displayIcon = (id: string): boolean => {
    if (this.props.cartitems?.find((item) => item.id === id)) return true;
    else return false;
  };
  render() {
    const { product } = this.props;
    return (
      <div
        className={
          this.displayIcon(product.id)
            ? "productcard product_shadow"
            : this.state.hover
            ? "productcard product_shadow"
            : "productcard"
        }
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div
          className="product_items"
          onClick={() => this.handleClick(product.id)}
        >
          <img className="product_gallery" src={product.gallery[0]} alt="" />
          <h3>{product.name}</h3>
          <h3>{product.brand}</h3>
          <h3>
            <Price prices={product.prices} />
          </h3>
        </div>
        {this.displayIcon(product.id) ? (
          <img className="product_icon" src="/icon.png" alt="" />
        ) : this.state.hover ? (
          <button
            disabled={!product.inStock}
            onClick={() => this.props.addTocart(product)}
            className={
              product.inStock ? "product_button" : "product_button gray_color"
            }
          >
            Add To Cart
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    cartitems: state.cartitems,
  };
}
export default connect(mapStateToProps, { addTocart })(ProductCard);
