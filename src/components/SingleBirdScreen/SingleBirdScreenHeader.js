import React  from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';

// TODO: try to unify this header and main header
const SingleBirdScreenHeader = ({ title, action }) => {
  const {
    headerContainerWrapper,
    headerContainer,
    mainWrapper,
    headerText,
    hiddenText,
    hiddenTextWrapper,
    headerWrapper
  } = styles;

  return (
    <View>
      <View style={headerContainerWrapper}>
        <View style={headerContainer}>
          <View style={mainWrapper}>
            <TouchableOpacity onPress={() => {Actions.refresh(); Actions[action]({ fromFilter: true })}}>
              <MaterialIcon name="arrow-left" size={30} color="#b49944" />
            </TouchableOpacity>
          </View>
          <View style={headerWrapper}>
            <Text style={headerText}>{ title }</Text>
          </View>
          <View style={hiddenTextWrapper}>
            <Text style={hiddenText}>&nbsp;</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = {
  headerContainerWrapper: {
    height: 56,
    backgroundColor: '#1d1c1c',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    marginLeft: 12,
  },
  mainWrapper: {
    position: 'relative',
  },
  headerWrapper: {
    width: '80%',
  },
  headerText: {
    color: '#b49944',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  hiddenTextWrapper: {
    marginRight: 12
  },
  hiddenText: {
    color: '#1d1c1c'
  }
};

export default SingleBirdScreenHeader;
