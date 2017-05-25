import {combineReducers} from 'redux';

import {stocks} from './stocks';
import {selectedDate} from './selectedDate';
import {stocksFilter} from './stocksFilter';
import {transactions} from './transactions';
import {tradeParams} from './tradeParams';
import {transactionsFilters} from './tradeParams';

export default combineReducers({
  stocks,
  selectedDate,
  stocksFilter,
  transactions,
  tradeParams,
  transactionsFilters
});
