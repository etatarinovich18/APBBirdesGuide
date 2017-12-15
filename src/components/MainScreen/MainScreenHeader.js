import React  from 'react';
import { View } from 'react-native';
import SortAndFilter from './SortAndFilter';
import { BirdsCounter } from './BirdsCounter';
import HeaderSearchTitle from './HeaderSearchTitle';

const MainScreenHeader = (props) => {
  return (
      <View>
        <HeaderSearchTitle {...props} />
        <SortAndFilter {...props} />
        <BirdsCounter count={props.birdsCount} hasSearch={props.hasSearch} />
      </View>
    );
}

export default MainScreenHeader