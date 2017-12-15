import { SET_SORT_FIELDS } from '../actions/types';
import { RESET_SORT_FIELDS } from '../actions/types';

const INITIAL_STATE = {
  lang: 'name_rus'
}

export default SortReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SORT_FIELDS:
      return { ...state, [action.payload.field]: action.payload.value};
    case RESET_SORT_FIELDS:
      return INITIAL_STATE;
    default:
      return state;
  }
}