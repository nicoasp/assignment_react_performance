import React from "react";
// import { Link } from 'react-router-dom';
const moment = require("moment");
import Input from './elements/Input';
import InputGroup from './elements/InputGroup'
import Select from './elements/Select'


const transactionRow = (transaction) => {
  const date = moment(new Date(Number(transaction.date))).format("YYYY-MM-DD")

  return (
    <tr key={`${transaction.symbol}${transaction.price}`}>
      <td>{date}</td>
      <td>{transaction.symbol}</td>
      <td>{transaction.type}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.price}</td>
    </tr>
  );
};

const transactionsContent = transactions => {
	let transactionRows;
	if (transactions.length) {
		transactionRows = transactions.map((transaction) => {
			return transactionRow(transaction)
		})
	} else {
    transactionRows = (
    <tr>
      <td>No transactions!</td>
    </tr>      
    )
  }


  return (
    <div className="table-responsive stocks-table">
      <table className="table table-condensed">
        <thead className="thead-inverse">
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactionRows}
        </tbody>
      </table>
    </div>
  );
};

const Transactions = ({ setTransactionsFilters, transactions = [] }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="Dashboard-Select">
            <InputGroup name="symbol" labelText="Filter By Symbol">
              <Input onChange={setTransactionsFilters} />
            </InputGroup>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="Dashboard-Select">
            <InputGroup name="symbol" labelText="Filter By Date Before">
              <Input type="date" onChange={setTransactionsFilters} />
            </InputGroup>
          </div>
          <div>
            <InputGroup name="symbol" labelText="Filter By Date After">
              <Input type="date" onChange={setTransactionsFilters} />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="row">
  			{transactionsContent(transactions)}
      </div>
    </div>
  );
};

export default Transactions;