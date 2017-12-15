import React  from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SortModal } from './SortModal';
import { Actions } from 'react-native-router-flux';

const SortAndFilter = (props) => {
    const {
      containerStyle,
      buttonStyle,
      buttonTextStyle,
      iconStyle
    } = styles;

    return (
      <View style={containerStyle}>
        <TouchableOpacity
          onPress={props.toggleSortModal}
          style={{ ...buttonStyle, borderRightWidth: 1, borderRightColor: '#c5c9c6'}}>
          <View style={buttonStyle}>
            <MCIcon style={{ ...iconStyle, top: 6}} name="sort-variant" size={24} />
            <Text style={buttonTextStyle}>Сортировать</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle} onPress={() => Actions.filter()}>
          <View style={buttonStyle}>
            <MCIcon style={{ ...iconStyle, top: 8 }} name="filter-outline" size={24} />
            <Text style={buttonTextStyle}>Фильтровать</Text>
          </View>
        </TouchableOpacity>
        <SortModal visible={props.sortModalVisible} close={props.toggleSortModal} {...props} />
      </View>
    );
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: '#f2f6f7',
  },
  buttonStyle: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    position: 'relative'
  },
  buttonTextStyle: {
    color: '#707070',
  },
  iconStyle: {
    position: 'absolute',
    left: -32
  }
}

export default SortAndFilter;