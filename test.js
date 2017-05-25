const moment = require("moment");
const dayMillSec = 24 * 60 * 60 * 1000;
let date = moment(new Date(Date.now() - 10 * dayMillSec)).format("YYYY-MM-DD")

const transactionsData = [
	{
		date: Date.now() - 25 * dayMillSec,
		symbol: "CMCO",
		type: "BUY",
		quantity: 100,
		price: 26.23
	},
	{
		date: Date.now() - 20 * dayMillSec,
		symbol: "AAMC",
		type: "BUY",
		quantity: 200,
		price: 76.25
	},
	{
		date: Date.now() - 14 * dayMillSec,
		symbol: "CMCO",
		type: "SELL",
		quantity: 150,
		price: 24.81
	},
	{
		date: Date.now() - 10 * dayMillSec,
		symbol: "SAH",
		type: "BUY",
		quantity: 500,
		price: 19.15
	}
] 

console.log(date)