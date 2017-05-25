import {connect} from 'react-redux';

import Portfolio from '../components/Portfolio';
// import {selectDate} from '../actions';

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    stocks: state.stocks.data,
    selectedDate: state.selectedDate
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     selectDate: (date) => {
//     	dispatch(selectDate(date));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  null
)(Portfolio);