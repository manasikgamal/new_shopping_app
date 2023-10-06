import React, { Component, Ref, RefObject, useRef } from "react";
import { connect } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import Bag from "./Bag";
import Currency from "./Currency";
import "./Header.css";
import { cstate } from "./reducers/currencyReducer";
import { headerstate } from "./reducers/headerReducer";
import { currencySymbol, getCurrencies } from "./services/currencyservices";
import {
  Descriptioninterface,
  RootState,
} from "./services/descriptionservices";
import { toggleBagButton } from "./services/headerservices";
import { fetchCartitems } from "./services/Itemservices";
import { fetchData } from "./services/productsServices";

interface Props {
  fetchData: (title: string) => Promise<void>;
  cartitems: Array<Descriptioninterface>;
  fetchCartitems: () => void;
  toggleBagButton: (status: boolean) => void;
  header: headerstate;
  navigate: NavigateFunction;
  wrapperRef: RefObject<HTMLDivElement>;
  currencySymbol: (currency_name: cstate) => void;
  currencytype?: cstate;
  CurrencyRef: RefObject<HTMLDivElement>;
}
interface MyState {
  active: Number;
  togglecurrency: boolean;
}
class Header extends Component<Props, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { active: 1, togglecurrency: false };
  }
  handleSubmit = (title: string) => {
    const { fetchData } = this.props;
    if (title === "") {
      fetchData("");
      this.setState({ active: 1 });
    }
    if (title === "clothes") {
      fetchData("clothes");
      this.setState({ active: 2 });
    }
    if (title === "tech") {
      fetchData("tech");
      this.setState({ active: 3 });
    }
    this.props.navigate("/");
  };
  nonColor=()=>{
    this.setState({ active: 0 });
  }
  componentDidMount() {
    const { fetchData } = this.props;
    const handleClickOutside = (event: any) => {
      if (
        this.props.wrapperRef &&
        this.props.wrapperRef?.current !== null &&
        !this.props.wrapperRef?.current.contains(event.target)
      ) {
        this.props.toggleBagButton(true);
      }
    };
    const handleClickOutsideCurrency = (event: any) => {
      if (
        this.props.CurrencyRef &&
        this.props.CurrencyRef?.current !== null &&
        !this.props.CurrencyRef?.current.contains(event.target)
      ) {
        this.setState({ togglecurrency: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsideCurrency);
    fetchData("");
    this.props.currencySymbol(
      localStorage.getItem("currency")
        ? JSON.parse(localStorage.getItem("currency") || "")
        : {"label": "USD","symbol": "$"}
    );
    this.props.fetchCartitems();
  }
  render() {
    const { cartitems } = this.props;
    const { currencytype } = this.props;
    return (
      <div className="header_conatiner">
        <div className="header_tab">
          <li
            className={this.state.active === 1 ? "active" : ""}
            onClick={() => this.handleSubmit("")}
          >
            ALL
          </li>
          <li
            className={this.state.active === 2 ? "active" : ""}
            onClick={() => this.handleSubmit("clothes")}
          >
            Clothes
          </li>
          <li
            className={this.state.active === 3 ? "active" : ""}
            onClick={() => this.handleSubmit("tech")}
          >
            Technology
          </li>
        </div>
        <div className="header_logo">
          <img src="/m5.PNG" alt="" />
        </div>
        <div className="header_options">
          <div
            ref={this.props.CurrencyRef}
            className="header_currency"
            onClick={() =>
              this.setState({ togglecurrency: !this.state.togglecurrency })
            }
          >
            <li>{currencytype?.symbol}</li>
            <li>
              <p
                className={
                  this.state.togglecurrency ? "rotateup" : "rotatedown"
                }
              >
                ^
              </p>
            </li>
            {this.state.togglecurrency && <Currency />}
          </div>
          <div ref={this.props.wrapperRef} className="header_shop">
            <img
              src="/m5.PNG"
              alt=""
              onClick={() =>
                this.props.toggleBagButton(this.props.header.togglebage)
              }
            />
            <div className="header_num">
              {cartitems.reduce((a, c) => a + c.count, 0)}
            </div>
            {this.props.header.togglebage ? (
              <div>
                <Bag />
                <div className="bag_buttons">
                  <button
                    className="bag_btn_view"
                    onClick={() => {
                      this.props.navigate("/cart");
                      this.props.toggleBagButton(true);
                      this.nonColor();
                    }}
                  >
                    VIEW BAG
                  </button>
                  <button className="bag_btn_check">CHECK OUT</button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    currencies: state.currencies,
    cartitems: state.cartitems,
    header: state.header,
    currencytype: state.currencytype,
  };
}

export default connect(mapStateToProps, {
  fetchData,
  getCurrencies,
  fetchCartitems,
  toggleBagButton,
  currencySymbol,
})(Header);
