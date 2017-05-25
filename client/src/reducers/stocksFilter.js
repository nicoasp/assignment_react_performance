import * as Actions from '../actions';

const initialState = "";

export function stocksFilter(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_STOCKS_FILTER:
      return action.data;
    default:
      return state;
  }
}
