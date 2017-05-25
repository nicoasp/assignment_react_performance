import React from 'react'
import { Prompt } from 'react-router-dom'
import Input from './elements/Input'
import InputGroup from './elements/InputGroup'
import Select from './elements/Select'
import Button from './elements/Button'
import { getParams } from '../helpers/paramsParser';
import { formatMoney } from '../helpers/formatMoney';
import { calculateCash } from '../services/calculateCash';
import { calculateStockAmount } from '../services/calculateStockAmount'

const buttonDisabledStatus = (availableCash, orderPrice, quantity, stockAmount, type) => {
	if ((type === "BUY" && orderPrice > availableCash)
		|| (type === "SELL" && quantity > stockAmount)) {
		return true;
	}
	return false;
}

const orderStatus = (availableCash, orderPrice, quantity, stockAmount, type) => {
	if (type === "BUY" && orderPrice > availableCash) {
		return (<p className="invalid">Not enough money</p>)
	}
	if (type === "SELL" && quantity > stockAmount) {
		return (<p className="invalid">Not enough stock</p>)
	}
	return (<p className="valid">Valid</p>)
}

const availableAssets = (displayCash, stockAmount, type) => {
	if (type === "BUY") {
		return (
			<div>
		    <p>Cash Available:</p>
		    <p>{`$${displayCash}`}</p>
		  </div>
		)
	} else {
		return (
			<div>
		    <p>Stock Available:</p>
		    <p>{stockAmount}</p>
		  </div>
		)		
	}
}

const Trade = ({ selectedDate, stocks, transactions, tradeParams, location, newTransaction, onChangeType, onChangeQuantity }) => {
	const symbol = getParams(location.search).symbol;
	let price = stocks[symbol] ? stocks[symbol].current : "";

	let availableCash = calculateCash(transactions);
	let displayCash = formatMoney(2, availableCash);

	let orderPrice = price ? tradeParams.quantity * price : 0;
	let displayPrice = formatMoney(2, orderPrice);

	let stockAmount = calculateStockAmount(transactions, symbol);
  return (
  	<div>
		  <table className="table table-condensed stocks-table">
	      <thead className="thead-inverse">
	        <tr>
	          <th>New Trade</th>
	        </tr>
	      </thead>
	    </table>
	  	<div className="Dashboard row">
				<div className="col-sm-6"> 	
		    	<form onSubmit={ newTransaction }>
				    <InputGroup name="symbol" labelText="Symbol">
				      <Input readOnly name="symbol" value={symbol}/>
				    </InputGroup>
				    <InputGroup name="type" labelText="Buy/Sell">
				    	<Select name="type" className="form-control" options={["BUY", "SELL"]} value={tradeParams.type} onChange={onChangeType}/>
				    </InputGroup>
				    <InputGroup name="quantity" labelText="Quantity">
				      <Input type="number" name="quantity" value={tradeParams.quantity} onChange={onChangeQuantity}/>
				    </InputGroup>
				    <InputGroup name="price" labelText="Price">
				      <Input readOnly type="number" name="price" value={price} />
				    </InputGroup>
				    <Input type="hidden" name="date" value={selectedDate} />
				    <Button disabled={buttonDisabledStatus(availableCash, orderPrice, tradeParams.quantity, stockAmount, tradeParams.type)} type="submit" color="primary">Place Order!</Button>
		    	</form>
		    </div>
		    <div className="col-sm-2">
		    </div>
				<div className="col-sm-4">
					<br />
					{availableAssets(displayCash, stockAmount, tradeParams.type)}
				  <br />
					<div>
				    <p>{tradeParams.type === "BUY" ? "Total Order Cost:" : "Total Revenue"}</p>
				    <p>{`$${displayPrice}`}</p>
				  </div>				  
			    <br />
			    <div>	
				    <p>Order Status</p>
				    {orderStatus(availableCash, orderPrice, tradeParams.quantity, stockAmount, tradeParams.type)}
				  </div>
		    </div>
	    </div>
      <Prompt
        when={tradeParams.quantity > 0}
        message="Are you sure you want to leave? Your form data will be lost!"
      />
	  </div>
  )
}


export default Trade
