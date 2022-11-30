import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AttributeSet,
  Descriptioninterface,
  ItemSet,
  RootState,
} from "./services/descriptionservices";
import { getItems, resetKey } from "./services/Itemservices";

interface IProps {
  items: Array<ItemSet>;
  description: Descriptioninterface;
  id: string;
  index: number;
  getItems: (
    productobj: Descriptioninterface,
    itemName: string,
    itemValue: string,
    key: number
  ) => void;
  mno: number;
}
class Item extends Component<IProps, {}> {
  render() {
    const { items } = this.props;
    const { description } = this.props;
    const { id } = this.props;
    return (
      <div className="desc_items">
        {items?.map((item, key) => (
          <p
            onClick={() => {
              this.props.getItems(description, id, item.value, key);
            }}
            key={key}
            style={{
              backgroundColor: id === "Color" ? item.value : "",
              padding: id === "Color" ? "15px 25px" : "",
              border: key === this.props.mno ? "red solid" : "",
            }}
          >
            {id === "Color" ? "" : item.value}
          </p>
        ))}
      </div>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    state,
  };
}
export default connect(mapStateToProps, { resetKey, getItems })(Item);
