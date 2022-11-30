import React, { Component } from "react";
import Item from "./Item";
import {
  AttributeSet,
  Descriptioninterface,
} from "./services/descriptionservices";

interface AProps {
  attributes?: Array<AttributeSet>;
  description: Descriptioninterface;
}
export default class Attributes extends Component<AProps, {}> {
  render() {
    const descitem = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items") || "").attributes
      : this.props.attributes
      ? this.props.attributes
      : [];
    const { description } = this.props;
    return (
      <div>
        {descitem.map((a: any, i: any) => (
          <h3 key={i}>
            {a.name}
            <Item
              items={a.items}
              mno={a.key}
              description={description}
              id={a.id}
              index={descitem.length}
            />
          </h3>
        ))}
      </div>
    );
  }
}
