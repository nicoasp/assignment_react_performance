export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const SELECT_DATE = 'SELECT_DATE';
export const SET_STOCKS_FILTER = 'SET_STOCKS_FILTER';
export const SET_TRANSACTIONS_FILTERS = 'SET_TRANSACTIONS_FILTERS';
export const SET_STOCKS_SORT = 'SET_STOCKS_SORT';
export const NEW_TRANSACTION = "NEW_TRANSACTION";
export const SET_TRADE_QUANTITY = 'SET_TRADE_QUANTITY';
export const SET_TRADE_TYPE = 'SET_TRADE_TYPE';

export function requestStart() {
  return {
    type: REQUEST_START
  };
}

export function requestSuccess(data) {
  return {
    type: REQUEST_SUCCESS,
    data
  };
}

export function requestFailure(error) {
  return {
    type: REQUEST_FAILURE,
    error
  };
}

export function getStocks(date, initial=false) {
  return (dispatch) => {
    dispatch(requestStart());

    fetch(`api/stocks?date=${date}&initial=${initial}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(results => {
        dispatch(requestSuccess(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(requestFailure(error));
      });
  }
}

export function selectDate(data) {
  return {
    type: SELECT_DATE,
    data
  }
}

export function setStocksFilter(data) {
  return {
    type: SET_STOCKS_FILTER,
    data
  }
}

export function setTransactionsFilters(data) {
  return {
    type: SET_TRANSACTIONS_FILTERS,
    data
  }
}

export function setStocksSort(data) {
  return {
    type: SET_STOCKS_SORT,
    data
  }
}

export function newTransaction(data) {
  return {
    type: NEW_TRANSACTION,
    data
  }
}

export function setTradeQuantity(data) {
  return {
    type: SET_TRADE_QUANTITY,
    data
  }
}

export function setTradeType(data) {
  return {
    type: SET_TRADE_TYPE,
    data
  }
}
