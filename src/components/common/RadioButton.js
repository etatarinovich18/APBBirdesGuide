import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const RadioButton = ({ setSortField, field, value, label, marked }) => {

  const { radioOptionStyle, radioButtonStyle } = styles;

  return (
    <TouchableOpacity onPress={() => setSortField(field, value)}>
      <View style={radioOptionStyle}>
        <Text style={{color: marked ? '#000' : '#9b9b9b'}}>{label}</Text>
        <MCIcon
          name={marked ? 'radiobox-marked' : 'radiobox-blank'}
          size={22}
          style={{ ...radioButtonStyle, color: marked ? '#b49944' : '#9b9b9b'}} />
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  radioOptionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 7
  },
  radioButtonStyle: {
    color: '#9b9b9b',
  }
}

export { RadioButton };