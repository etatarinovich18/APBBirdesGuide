import { SET_SEARCH_FIELD } from './types';
import { SET_ARRAY_SEARCH_FIELD } from './types';
import { RESET_SEARCH_FIELDS } from './types';

// field - ENUM (lang, size)
// value (see birds.json)

export const setSearchField = (field, value) => {
  return {
    type: SET_SEARCH_FIELD,
    payload: { field, value }
  }
}

export const setArraySearchField = (field, value) => {
  return {
    type: SET_ARRAY_SEARCH_FIELD,
    payload: { field, value }
  }
}

export const resetSearchFields = () => {
  return {
    type: RESET_SEARCH_FIELDS
  }
}