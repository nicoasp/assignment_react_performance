import * as Actions from '../actions';

const initialState = Date.now() - 2 * 24 * 60 * 60 * 1000;

export function selectedDate(state = initialState, action) {
  switch (action.type) {
    case Actions.SELECT_DATE:
      return action.data
    default:
      return state;
  }
}
