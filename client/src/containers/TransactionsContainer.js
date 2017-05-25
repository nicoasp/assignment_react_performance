import {connect} from 'react-redux';

import Transactions from '../components/Transactions';
import {setTransactionsFilters} from '../actions';


const filterTransactions = (transactions, filter) => {
	let regex = new RegExp(filter, 'i');
  return transactions.filter((transaction) => {
  	return regex.exec(transaction.symbol);
  })
}

const mapStateToProps = state => {
  return {
    transactions: filterTransactions(state.transactions, state.transactionsFilters)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTransactionsFilter: (e) => {
      const filter = e.target.value;
      dispatch(setTransactionsFilters(filter));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);