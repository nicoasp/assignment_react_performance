import * as Actions from '../actions';

const initialState = {
	type: "symbol",
	direction: "ASC"
};

export function stocksSort(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_STOCKS_SORT:
      return action.data;
    default:
      return state;
  }
}