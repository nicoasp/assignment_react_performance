import * as Actions from '../actions';

const dayMillSec = 24 * 60 * 60 * 1000;
const initialState = [
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
		quantity: 50,
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

export function transactions(state = initialState, action) {
  switch (action.type) {
    case Actions.NEW_TRANSACTION:
      return [
      	...state,
      	action.data
      ]
    default:
      return state;
  }
}
