import { SET_SORT_FIELDS } from './types';
import { RESET_SORT_FIELDS } from './types';

// field - ENUM (lang, size)
// value (see birds.json)

export const setSortField = (field, value) => {
  return {
    type: SET_SORT_FIELDS,
    payload: { field, value }
  }
}

export const resetSortFields = () => {
  return {
    type: RESET_SORT_FIELDS
  }
}