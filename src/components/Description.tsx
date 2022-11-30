import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Descriptioninterface,
  fetchDescription,
  RootState,
} from "./services/descriptionservices";
import "./Description.css";
import { withRouter } from "./withRouter";
import DescriptionImages from "./DescriptionImages";
import Price from "./Price";
import {
  addTocart,
  clearMessage,
  getItems,
  resetKey,
} from "./services/Itemservices";
import Attributes from "./Attributes";
import { mstate } from "./reducers/messageReducer";

interface Props {
  description?: Descriptioninterface;
  params: typeof useParams;
  fetchDescription: (id: string) => Promise<void>;
  resetKey: (productobj: Descriptioninterface) => void;
  message: mstate;
  clearMessage: () => void;
  addTocart: (product: Descriptioninterface) => void;
}
interface Dstate {
  url: string;
}
class Description extends Component<Props, Dstate> {
  constructor(props: any) {
    super(props);
    this.state = { url: "" };

    this.handleimg = this.handleimg.bind(this);
  }
  handleimg = (value: string) => {
    this.setState({ url: value });
  };
  componentDidMount() {
    const id = this.props.params.toString();
    this.props.fetchDescription(id);
    this.props.clearMessage();
  }
  componentWillUnmount(): void {
    localStorage.removeItem("items");
  }
  render() {
    const { description } = this.props;
    const { message } = this.props;
    return (
      <div>
        {description ? (
          [description].map((x, index) => (
            <div className="desc_container" key={index}>
              <div className="desc_images">
                <DescriptionImages
                  handleimg={this.handleimg}
                  url={this.state.url}
                  gallery={x.gallery}
                  first={x.gallery && x.gallery[0]}
                />
              </div>
              <div className="desc_right">
                <h2>{x.name}</h2>
                <h3>{x.brand}</h3>
                <h3 className={x.inStock ? "In-Stock" : "Out-Stock"}>
                  {x.inStock ? "In-Stock" : "Out-Stock"}
                </h3>
                {message.message.length > 0 ? (
                  <div className="desc_alert">{message.message}</div>
                ) : (
                  ""
                )}
                <Attributes
                  attributes={x.attributes}
                  description={description}
                />
                <h3>
                  Price <Price prices={x.prices} />
                </h3>
                <div
                  className={
                    description.ctr === description.attributes?.length ||
                    (description.attributes?.length === 0 && x.inStock)
                      ? "desc_btn"
                      : "desc_btn desc_disable"
                  }
                >
                  <button
                    disabled={
                      description?.attributes?.length === 0 && x.inStock
                        ? false
                        : description?.ctr !== description?.attributes?.length
                    }
                    onClick={() => {
                      this.props.addTocart(
                        localStorage.getItem("items")
                          ? JSON.parse(localStorage.getItem("items") || "")
                          : x
                      );
                      this.props.resetKey(description);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
                <div dangerouslySetInnerHTML={{ __html: x.description }} />
              </div>
            </div>
          ))
        ) : (
          <div>no data</div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    description: state.description,
    message: state.message,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    fetchDescription,
    resetKey,
    clearMessage,
    addTocart,
  })(Description)
);
