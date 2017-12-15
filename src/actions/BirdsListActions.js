import birds from '../birds.json';
import { FILTER_BIRDS } from './types';
import _ from 'lodash-es';

const defaultSearchParams = {
  query: ''
};
const defaultSortParams = {
  lang: 'name_rus'
}

const filterByText = query => {
  return _.filter(birds.birds, bird => {
    const { name_rus: nameRus } = bird;
    const titleBel = bird['title-bel'];
    const titleLat = bird['title-lat'];

    query = query ? query.toLocaleLowerCase() : '';

    return nameRus.toLocaleLowerCase().indexOf(query) !== -1
      || titleLat.toLocaleLowerCase().indexOf(query) !== -1
      || titleBel.toLocaleLowerCase().indexOf(query) !== -1;
  });
};

const sortBirds = (list, sort) => {
  const fieldsArr = [];
  const directionArr = [];

  sort.size && fieldsArr.push('razm') && directionArr.push(sort.size);
  sort.lang && fieldsArr.push(sort.lang) && directionArr.push('asc');

  return _.orderBy(list, fieldsArr, directionArr);
}

export const filterBirds = (fields = defaultSearchParams, sort = defaultSortParams) => {
  let filteredList = birds.birds;

  if (fields.query) {
    filteredList = filterByText(fields.query);
  }

  // get rid of query prop in fields object
  const fieldsCopy = _.clone(fields);

  delete fieldsCopy.query;

  if (!_.isEmpty(fieldsCopy)) {
    filteredList = _.filter(filteredList, fieldsCopy);
  }

  if (sort) {
    filteredList = sortBirds(filteredList, sort);
  }


  return {
    type: FILTER_BIRDS,
    payload: {
      filteredList: filteredList,
      query: fields.query
    }
  };
}
