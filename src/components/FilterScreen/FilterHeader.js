import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';

const FilterHeader = ({ title, action, actionType, filterNotEmpty, resetSearchFields, filterBirds }) => {

  const {
    headerContainer,
    mainWrapper,
    headerText,
    clearIcon,
    backIcon
  } = styles;

  return (
    <View style={headerContainer}>
      <View style={mainWrapper}>
        <TouchableWithoutFeedback onPress={() => Actions[action]({type: actionType || 'back'})}>
          <MaterialIcon style={backIcon} name="chevron-left" size={30} color="#b49944" />
        </TouchableWithoutFeedback>
        <Text style={headerText}>{title}</Text>
        { filterNotEmpty ? (
          <TouchableWithoutFeedback onPress={() => {
            resetSearchFields();
            filterBirds();
          }}>
            <MaterialCommunityIcon style={clearIcon} name="filter-remove" color="#b49944" size={24} />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </View>
  )
};

const styles = {
  headerContainer: {
    height: 56,
    backgroundColor: '#1d1c1c',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginLeft: 16,
  },
  mainWrapper: {
    flexDirection: 'row',
    position: 'relative',
    flex: 1
  },
  headerText: {
    color: '#b49944',
    marginLeft: 38,
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearIcon: {
    position: 'absolute',
    right: 14,
    top: 3
  }
};

export default FilterHeader;