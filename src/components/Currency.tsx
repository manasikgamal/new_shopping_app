import React, { Component } from "react";
import { connect } from "react-redux";
import "./Currency.css";
import { cstate } from "./reducers/currencyReducer";
import {
  currencylocalSymbol,
  currencySymbol,
  getCurrencies,
} from "./services/currencyservices";
import { RootState } from "./services/descriptionservices";

interface Pcurrency {
  getCurrencies: () => void;
  currencies: string[];
  currencySymbol: (name: string) => void;
  currencytype: cstate;
}

class Currency extends Component<Pcurrency, {}> {
  componentDidMount(): void {
    this.props.getCurrencies();
  }
  render() {
    const { currencies } = this.props;
    return (
      <div className="currency_container">
        {currencies.map((x, index) => (
          <div
            key={index}
            onClick={() => this.props.currencySymbol(x)}
            className="currency"
          >
            {currencylocalSymbol(x)} {x}
          </div>
        ))}
      </div>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    currencies: state.currencies,
    currencytype: state.currencytype,
  };
}
export default connect(mapStateToProps, { getCurrencies, currencySymbol })(
  Currency
);
