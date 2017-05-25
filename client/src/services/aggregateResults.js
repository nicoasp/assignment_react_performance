import { formatMoney } from '../helpers/formatMoney';

export function aggregateResults(portfolio) {
	let aggregatedResults = {
		costBasis: 0,
		currentValue: 0,
		profit: 0,
		dayAgo: 0,
		weekAgo: 0,
		monthAgo: 0
	};
	if (!Object.keys(portfolio).length) return aggregatedResults;

  for (let symbol in portfolio) {
  	aggregatedResults.costBasis += portfolio[symbol].costBasis;
  	aggregatedResults.currentValue += portfolio[symbol].currentValue;
  	aggregatedResults.profit += portfolio[symbol].profit;
  	aggregatedResults.dayAgo += portfolio[symbol].dayAgo * portfolio[symbol].quantity;
  	aggregatedResults.weekAgo += portfolio[symbol].weekAgo * portfolio[symbol].quantity;
  	aggregatedResults.monthAgo += portfolio[symbol].monthAgo * portfolio[symbol].quantity;
  }

  return aggregatedResults;
}