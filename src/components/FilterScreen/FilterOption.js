import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { fields } from '../../birds.json';
import _ from 'lodash';

const FilterOption = ({ title, screen, chosen }) => {

  const {
    containerStyle,
    titleStyle,
    chosenStyle
  } = styles;
  let remainingChosenItems = 0;

  chosen = _.clone(chosen);
  chosen = Array.isArray(chosen) ? chosen : [chosen];

  if (chosen.length > 3) {
    remainingChosenItems = chosen.splice(3, 20).length;
  }

  let chosenText = chosen.map(item => {
    return fields[item];
  }).join(', ');

  chosenText += remainingChosenItems ? ` ( + ${remainingChosenItems} )` : '';

  return (
    <TouchableOpacity onPress={() => screen && Actions[screen]()}>
      <View style={containerStyle}>
        <Text style={titleStyle}>{title}</Text>
        <MaterialIcon name="chevron-right" size={26} color="#757575" />
        { chosen ? (
          <Text style={chosenStyle}>{chosenText}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  containerStyle: {
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  titleStyle: {
    fontSize: 14,
    color: '#000'
  },
  chosenStyle: {
    position: 'absolute',
    left: 16,
    fontSize: 12,
    bottom: 5
  }
}

export default FilterOption;