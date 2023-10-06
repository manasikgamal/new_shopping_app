import React, { Component } from 'react'
import { connect } from 'react-redux';
import { cstate } from './reducers/currencyReducer';
import { price, RootState } from './services/descriptionservices'

interface PProps{
    prices?:price[],
    currencytype?:cstate
}

class Price extends Component<PProps,{}> {
  render() {
    const {prices}=this.props;
    const {currencytype}=this.props;
    return (
      <div>
       {prices&&prices.map((p,index)=>p.currency===currencytype?.label&&<div key={index}>{currencytype.symbol}{p.amount}</div>)}
      </div>
    )
  }
}
function mapStateToProps(state:RootState){
  return{
    currencytype:state.currencytype
  }
}
export default connect(mapStateToProps,null)(Price)
