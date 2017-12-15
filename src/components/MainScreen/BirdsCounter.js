import React from 'react';
import { View, Text } from 'react-native';
import { declOfNum } from '../../helpers';

const BirdsCounter = ({ count, hasSearch }) => {

  const {
    counterStyle,
    textStyle
  } = styles;

  return (
    <View style={counterStyle}>
      <Text style={textStyle}>{hasSearch ? declOfNum(count, ['Найдена ', 'Найдено ', 'Найдено ']) : 'Всего '}</Text>
      <Text style={textStyle}>{count} {declOfNum(count, ['птица', 'птицы', 'птиц'])}</Text>
    </View>
  )
}

const styles = {
  counterStyle: {
    backgroundColor: '#edf0f1',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16
  },
  textStyle: {
    color: '#707070',
    fontSize: 12
  }
}

export { BirdsCounter };