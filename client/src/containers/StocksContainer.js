import React, {Component} from 'react';
import {connect} from 'react-redux';

import Stocks from '../components/Stocks';
import {getStocks, setStocksFilter, setStocksSort} from '../actions';

class StocksContainer extends Component {

  componentDidMount() {
    this.props.getStocks(this.props.selectedDate, true);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (this.props.selectedDate !== newProps.selectedDate) {
      this.props.getStocks(this.props.selectedDate, true);
    } 
    else if (Object.keys(newProps.totalStocks).length < 100 && !newProps.isFetching) {
      this.props.getStocks(this.props.selectedDate, false);
    }
  }

  // change date => first if triggered
  // date is the same. stocks < 100, isfetching = false => triggers second if
  // date is the same. stocks < 100, isfetching = true => triggers second if

  render() {
    return (
      <Stocks {...this.props} />
    );
  }
}

const filterStocks = (stocks, filter) => {
  let filteredStocks = {};
  let regex = new RegExp(filter, 'i');
  for (let symbol in stocks) {
    if (regex.exec(symbol)) {
      filteredStocks[symbol] = stocks[symbol];
    }
  }
  return filteredStocks;
}

const mapStateToProps = state => {
  return {
    totalStocks: state.stocks.data,
    stocks: filterStocks(state.stocks.data, state.stocksFilter),
    isFetching: state.stocks.isFetching,
    selectedDate: Number(state.selectedDate)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getStocks: (date, initial) => {
      dispatch(getStocks(date, initial));
    },
    setStocksFilter: (e) => {
      const filter = e.target.value;
      dispatch(setStocksFilter(filter));
    },
    setStocksSort: (e) => {
      let sortBy = {
        type: e.target.innerHTML,
        direction: "ASC"
      }
      dispatch(setStocksSort(sortBy))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StocksContainer);
