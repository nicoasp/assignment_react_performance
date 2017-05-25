import React from "react";
import { Link } from 'react-router-dom';
import { formatMoney } from '../helpers/formatMoney';

import Input from './elements/Input';
import Spinner from "./elements/Spinner";
import Button from './elements/Button'

const stocksRow = (symbol, prices) => {
  const current = prices.current;
  const dayAgo = prices.current - prices.dayAgo;
  const weekAgo = prices.current - prices.weekAgo;
  const monthAgo = prices.current - prices.monthAgo;

  return (
    <tr key={symbol}>
      <td>{symbol}</td>
      <td>{`$${formatMoney(2, current)}`}</td>
      <td>{`$${formatMoney(2, dayAgo)}`}</td>
      <td>{`$${formatMoney(2, weekAgo)}`}</td>
      <td>{`$${formatMoney(2, monthAgo)}`}</td>
      <td><Link to={`/trade?symbol=${symbol}`}>trade</Link></td>
    </tr>
  );
};

const stocksContent = (stocks, setStocksSort) => {
  let stocksRows = [];
  for (let symbol in stocks) {
    if (stocksRows.length <= 15) {
      stocksRows.push(stocksRow(symbol, stocks[symbol]));
    }
  }

  return (
    <div className="table-responsive small-type stocks-table">
      <table className="table table-condensed">
        <thead className="thead-inverse">
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>1d</th>
            <th>7d</th>
            <th>30d</th>
            <th>Trade?</th>
          </tr>
        </thead>
        <tbody>       
          {stocksRows}
        </tbody>
      </table>
    </div>
  );
};

const Stocks = ({ stocks, isFetching, setStocksFilter, setStocksSort }) => {
  return (
    <div>
      <form>
        <Input onChange={setStocksFilter} />
      </form>
      {!Object.keys(stocks).length || (isFetching && Object.keys(stocks).length > 100)
        ? <Spinner />
        : stocksContent(stocks, setStocksSort)}
    </div>
  );
};

export default Stocks;
