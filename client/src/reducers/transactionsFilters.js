import * as Actions from '../actions';

const initialState = "";

export function transactionsFilters(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_TRANSACTIONS_FILTERS:
      return action.data;
    default:
      return state;
  }
}
