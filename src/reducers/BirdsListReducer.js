import birdsData from '../birds.json';
import { FILTER_BIRDS } from '../actions/types';

export default BirdsReducer = (state = birdsData.birds, action) => {
  switch (action.type) {
    case FILTER_BIRDS:
      return action.payload.filteredList;
    default:
      return state;
  }
}