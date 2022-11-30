import { connect } from "react-redux";
import React, { Component } from "react";
import "./Product.css";
import { NavigateFunction } from "react-router-dom";
import {
  Descriptioninterface,
  RootState,
} from "./services/descriptionservices";
import ProductCard from "./ProductCard";

interface Props {
  products?: Descriptioninterface[];
  navigate: NavigateFunction;
}

class Product extends Component<Props, {}> {
  render() {
    const { products } = this.props;
    return (
      <div className="productcontainer">
        {products ? (
          products.map((x, index) => (
            <ProductCard
              key={index}
              product={x}
              navigate={this.props.navigate}
            />
          ))
        ) : (
          <div>there are no data to show</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps, null)(Product);
