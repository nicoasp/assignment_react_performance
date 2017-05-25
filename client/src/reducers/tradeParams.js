import * as Actions from '../actions';

const initialState = {
	quantity: 0,
	type: "BUY"
};

export function tradeParams(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_TRADE_QUANTITY:
      return {
      	...state,
      	quantity: action.data
      };
    case Actions.SET_TRADE_TYPE:
      return {
      	...state,
      	type: action.data
      };
    default:
      return state;
  }
}