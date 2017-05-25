import {connect} from 'react-redux';
import serialize from 'form-serialize';
import { withRouter } from 'react-router-dom'

import Trade from '../components/Trade';
import { newTransaction, setTradeQuantity, setTradeType } from '../actions';

const mapStateToProps = state => {
  return {
    selectedDate: Number(state.selectedDate),
    stocks: state.stocks.data,
    transactions: state.transactions,
    tradeParams: state.tradeParams
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newTransaction: (e) => {
      e.preventDefault()
      const form = e.target
      const data = serialize(form, {hash: true})
      const transactionData = {
      	date: data.date,
      	symbol: data.symbol,
      	type: data.type,
      	quantity: data.quantity,
      	price: data.price
      }

    	dispatch(newTransaction(transactionData));
    },
    onChangeQuantity: (e) => {
    	dispatch(setTradeQuantity(e.target.value));
    },
    onChangeType: (e) => {
    	dispatch(setTradeType(e.target.value));
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Trade));