export function calculateCash(transactions) {
	let cash = 100000;
	if (!transactions.length) return cash;
	transactions.forEach((transaction) => {
		if (transaction.type === "BUY") {
			cash -= (transaction.price * transaction.quantity)
		} else {
			cash += (transaction.price * transaction.quantity)
		}
	})
	return cash;
}