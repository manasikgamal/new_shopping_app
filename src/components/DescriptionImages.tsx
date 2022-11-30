import React, { Component } from "react";
import "./DescriptionImages.css";

interface DProps {
  gallery?: [string];
  first?: string;
  url: string;
  handleimg: (value: string) => void;
}

export default class DescriptionImages extends Component<DProps, {}> {
  render() {
    const { gallery } = this.props;
    return (
      <div className="desc_img_container">
        <div className="desc_left">
          {gallery?.map((g, index) => (
            <img
              onClick={() => this.props.handleimg(g)}
              key={index}
              src={g}
              alt=""
            />
          ))}
        </div>
        <div className="desc_main">
          <img
            src={this.props.url ? this.props.url : this.props.first}
            alt=""
          />
        </div>
      </div>
    );
  }
}
