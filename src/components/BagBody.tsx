import React, { Component } from "react";
import { connect } from "react-redux";
import "./BagBody.css";
import ImagesGallery from "./ImagesGallery";
import Price from "./Price";
import {
  Descriptioninterface,
  RootState,
} from "./services/descriptionservices";

interface Bprops {
  item: Descriptioninterface;
  addTocart: (product: Descriptioninterface) => void;
  removeFromcart: (product: Descriptioninterface) => void;
}
export default class BagBody extends Component<Bprops, {}> {
  render() {
    const { item } = this.props;
    return (
      <div className="bagbody_top">
        <div className="bagbody_left">
          <h3>{item.name}</h3>
          <h3>{item.brand}</h3>
          <h3>
            <Price prices={item.prices} />
          </h3>
          <div className="bagbody_choose">
            {item.attributes?.map((x, index) => (
              <p
                key={index}
                style={{
                  backgroundColor: x.id === "Color" ? x.choose : "",
                  padding: x.id === "Color" ? "15px 25px" : "",
                }}
              >
                {x.id === "Color" ? "" : x.choose}
              </p>
            ))}
          </div>
        </div>
        <div className="bagbody_center">
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
        <div>
          <ImagesGallery gallery={item.gallery} />
        </div>
      </div>
    );
  }
}
