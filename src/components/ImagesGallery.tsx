import React, { Component } from "react";
import "./ImagesGallery.css";

interface Iprops {
  gallery: [string];
}
interface Istate {
  index: number;
}
export default class ImagesGallery extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = { index: 0 };
    this.handleclickminus = this.handleclickminus.bind(this);
    this.handleclickplus = this.handleclickplus.bind(this);
  }
  handleclickminus = (index: number) => {
    if (index === -1) this.setState({ index: this.props.gallery.length - 1 });
    else this.setState({ index: index });
  };
  handleclickplus = (index: number) => {
    if (index === this.props.gallery.length) this.setState({ index: 0 });
    else this.setState({ index: index });
  };
  render() {
    const { gallery } = this.props;
    const { index } = this.state;
    return (
      <div className="gallery_container">
        <div
          className="gallery_left"
          onClick={() => this.handleclickminus(index - 1)}
        >
          &lt;
        </div>
        <img src={gallery[index]} alt="" />
        <div
          className="gallery_right"
          onClick={() => this.handleclickplus(index + 1)}
        >
          &gt;
        </div>
      </div>
    );
  }
}
