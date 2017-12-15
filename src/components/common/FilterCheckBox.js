import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterCheckBox = ({ field, value, label, marked, setArraySearchField }) => {

  const { checkBoxOptionStyle, checkBoxButtonStyle } = styles;

  return (
    <TouchableOpacity onPress={() => setArraySearchField(field, value, true)}>
      <View style={checkBoxOptionStyle}>
        <Text style={{color: '#000', fontSize: 14}}>{label}</Text>
        <MaterialCommunityIcon
          name={marked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={22}
          style={{ ...checkBoxButtonStyle, color: marked ? '#b49944' : '#9b9b9b'}} />
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  checkBoxOptionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  checkBoxButtonStyle: {
    color: '#9b9b9b',
  }
}

export { FilterCheckBox };