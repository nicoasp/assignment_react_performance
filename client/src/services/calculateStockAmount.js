export function calculateStockAmount(transactions, symbol) {
	let stockAmount = 0;
	if (!transactions.length) return stockAmount;
	transactions.forEach((transaction) => {
		if (transaction.symbol === symbol) {
			if (transaction.type === "BUY") {
				stockAmount += (transaction.quantity)
			} else {
				stockAmount -= (transaction.quantity)
			}
		} 
	})
	return Number(stockAmount);
}