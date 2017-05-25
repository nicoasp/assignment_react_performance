import { formatMoney } from '../helpers/formatMoney';

export function calculatePortfolio(transactions, stocks, selectedDate) {
	let portfolio = {};
	if (!transactions.length || !Object.keys(stocks).length) return portfolio;

	transactions.forEach((transaction) => {
		console.log("transaction", transaction.date, typeof transaction.date);
		console.log("selected", selectedDate, typeof selectedDate)
		if (transaction.date < selectedDate) {
			let symbol = transaction.symbol;
			portfolio[symbol] = portfolio[symbol] || { quantity: 0, costBasis: 0};

			if (transaction.type === "BUY") {
				portfolio[symbol].quantity += (transaction.quantity);
				portfolio[symbol].costBasis += (transaction.quantity * transaction.price);
			} else {
				portfolio[symbol].quantity -= (transaction.quantity);
				portfolio[symbol].costBasis -= (transaction.quantity * transaction.price);
			}
		}
	})


  for (let symbol in portfolio) {  	
    portfolio[symbol].currentValue = portfolio[symbol].quantity * stocks[symbol].current;
    portfolio[symbol].profit = portfolio[symbol].currentValue - portfolio[symbol].costBasis;
    portfolio[symbol].currentPrice = stocks[symbol].current;
    portfolio[symbol].dayAgo = stocks[symbol].current - stocks[symbol].dayAgo;
    portfolio[symbol].weekAgo = stocks[symbol].current - stocks[symbol].weekAgo;
    portfolio[symbol].monthAgo = stocks[symbol].current - stocks[symbol].monthAgo;
  }

  return portfolio;
}

const portfolioPosition = {
	quantity: 0,
	costBasis: 0,
}