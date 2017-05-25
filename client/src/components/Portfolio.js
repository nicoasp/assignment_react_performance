import React from "react";
const moment = require("moment");
import { Link } from 'react-router-dom';
import { calculatePortfolio } from '../services/calculatePortfolio';
import { aggregateResults } from '../services/aggregateResults'
import { formatMoney } from '../helpers/formatMoney';
import Spinner from "./elements/Spinner";


const portfolioRow = (symbol, position) => {
  return (
    <tr key={symbol}>
      <td>{symbol}</td>
      <td>{position.quantity}</td>
      <td>{`$${formatMoney(2, position.costBasis)}`}</td>
      <td>{`$${formatMoney(2, position.currentValue)}`}</td>
      <td>{`$${formatMoney(2, position.profit)}`}</td>
      <td>{`$${formatMoney(2, position.currentPrice)}`}</td>
      <td>{`$${formatMoney(2, position.dayAgo)}`}</td>
      <td>{`$${formatMoney(2, position.weekAgo)}`}</td>
      <td>{`$${formatMoney(2, position.monthAgo)}`}</td>
      <td><Link to={`/trade?symbol=${symbol}`}>trade</Link></td>
    </tr>
  );
};

const aggregatedRow = portfolio => {
	let aggregatedResults = aggregateResults(portfolio);
	console.log(aggregatedResults)
  if (Object.keys(portfolio).length) {
	  return (
      <tr>
        <td>{`$${formatMoney(2, aggregatedResults.costBasis)}`}</td>
        <td>{`$${formatMoney(2, aggregatedResults.currentValue)}`}</td>
        <td>{`$${formatMoney(2, aggregatedResults.profit)}`}</td>
        <td>{`$${formatMoney(2, aggregatedResults.dayAgo)}`}</td>
        <td>{`$${formatMoney(2, aggregatedResults.weekAgo)}`}</td>
        <td>{`$${formatMoney(2, aggregatedResults.monthAgo)}`}</td>
      </tr> 	  	
	  )
	} else {
    return (
    <Spinner />     
    )
  }	
}

const aggregatedContent = portfolio => {
	
  return (
    <div className="table-responsive stocks-table small-type">
      <table className="table table-condensed">
        <thead className="thead-inverse">
          <tr>
            <th>Cost Basis</th>
            <th>Current Value</th>
            <th>Profit/Loss</th>
            <th>1d</th>
            <th>7d</th>
            <th>30d</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedRow(portfolio)}       
        </tbody>
      </table>
    </div>
  );
};



const portfolioContent = portfolio => {

  let portfolioRows = [];
  if (Object.keys(portfolio).length) {
	  for (let symbol in portfolio) {
	    portfolioRows.push(portfolioRow(symbol, portfolio[symbol]));
	  }
	} else {
    portfolioRows = (
    <Spinner />     
    )
  }

  return (
    <div className="table-responsive stocks-table small-type">
      <table className="table table-condensed">
        <thead className="thead-inverse">
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Cost Basis</th>
            <th>Current Value</th>
            <th>Profit/Loss</th>
            <th>Current Price</th>
            <th>1d</th>
            <th>7d</th>
            <th>30d</th>
            <th>Trade?</th>
          </tr>
        </thead>
        <tbody>
          {portfolioRows}         
        </tbody>
      </table>
    </div>
  );
};

const Portfolio = ({ transactions = [], stocks, selectedDate }) => {
	let portfolio = calculatePortfolio(transactions, stocks, selectedDate);
	console.log("Portfolio:", portfolio);
  return (
    <div>
    	{aggregatedContent(portfolio)}
			{portfolioContent(portfolio)}
    </div>
  );
};

export default Portfolio;