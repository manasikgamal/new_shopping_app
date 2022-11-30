import React, { Component, Ref, RefObject, useMemo, useRef } from "react";
import { connect } from "react-redux";
import {
  Navigate,
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Bag from "./components/Bag";
import Cart from "./components/Cart";
import Description from "./components/Description";
import Header from "./components/Header";
import Product from "./components/Product";
import { headerstate } from "./components/reducers/headerReducer";
import { RootState } from "./components/services/descriptionservices";

interface appprop {
  navigation: NavigateFunction;
  header: headerstate;
  wrapperRef: RefObject<HTMLDivElement>;
  CurrencyRef: RefObject<HTMLDivElement>;
}
class App extends Component<appprop, {}> {
  render() {
    const { navigation } = this.props;
    const { togglebage } = this.props.header;
    return (
      <div className="app_container">
        <div className={togglebage ? "cover" : ""}></div>
        <Header
          navigate={navigation}
          wrapperRef={this.props.wrapperRef}
          CurrencyRef={this.props.CurrencyRef}
        />
        <Routes>
          <Route path="/" element={<Product navigate={navigation} />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    header: state.header,
  };
}
export default function () {
  const navigation = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const CurrencyRef = useRef<HTMLDivElement>(null);
  const NewApp = useMemo(() => {
    return connect(mapStateToProps, {})(App);
  }, []);
  return (
    <NewApp
      wrapperRef={wrapperRef}
      CurrencyRef={CurrencyRef}
      navigation={navigation}
    />
  );
}
