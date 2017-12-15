import { combineReducers } from 'redux';
import BirdsReducer from './BirdsListReducer';
import SearchFormReducer from './SearchFormReducer';
import SortReducer from './SortReducer';

export default combineReducers({
  birds: BirdsReducer,
  search: SearchFormReducer,
  sort: SortReducer
});