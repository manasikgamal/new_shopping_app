import React, { Component } from "react";
import { connect } from "react-redux";
import "./Currency.css";
import { cstate } from "./reducers/currencyReducer";
import {
  currencySymbol,
  getCurrencies,
} from "./services/currencyservices";
import { RootState } from "./services/descriptionservices";

interface Pcurrency {
  getCurrencies: () => void;
  currencies?: cstate[];
  currencySymbol: (currency_name:cstate) => void;
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
        {currencies&&currencies.map((x, index) => (
          <div
            key={index}
            onClick={() => this.props.currencySymbol(x)}
            className="currency"
          >
           {x.symbol} {x.label}
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
