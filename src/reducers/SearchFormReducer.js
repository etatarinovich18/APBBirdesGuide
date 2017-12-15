import { FILTER_BIRDS } from '../actions/types';
import { SET_SEARCH_FIELD } from '../actions/types';
import { SET_ARRAY_SEARCH_FIELD } from '../actions/types';
import { RESET_SEARCH_FIELDS } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  query: ''
}

export default SearchFormReducer = (state = INITIAL_STATE, action) => {
  const { field, value } = action.payload || {};
  
  switch (action.type) {
    case FILTER_BIRDS:
      return { ...state, query: action.payload.query };
    case SET_SEARCH_FIELD:
      return { ...state, [field]: value };
    case SET_ARRAY_SEARCH_FIELD:
      if (!state[field]) {
        return { ...state, [field]: [value]}
      } else if (state[field].indexOf(value) !== -1) {
        const idx = state[field].indexOf(value);
        const stateCopy = _.clone(state);

        stateCopy[field].splice(idx, 1);

        if (stateCopy[field].length === 0) {
          delete stateCopy[field];
        }

        return stateCopy;
      } else {
        return { ...state, [field]: [].concat(state[field], [value]) };
      }
    case RESET_SEARCH_FIELDS:
      return INITIAL_STATE;
    default:
      return state;
  }
}