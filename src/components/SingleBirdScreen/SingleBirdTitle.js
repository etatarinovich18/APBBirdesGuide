import React  from 'react';
import { View, Text } from "react-native";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SingleBirdTitle = ({ bird }) => {

  const {
    title,
    titleLang,
    titleTextBlock,
    titleWrapper,
    redBook
  } = styles;

  return (
    <View>
      <View style={titleTextBlock}>
        <View style={ titleWrapper }>
          <Text style={ titleLang }>Лат.</Text>
          <Text style={ title }>{ bird['title-lat'] }</Text>
        </View>
        <View style={ titleWrapper }>
          <Text style={ titleLang }>Бел.</Text>
          <Text style={ title }>{ bird['title-bel'] }</Text>
        </View>
      </View>
      { bird['red-book'] ? (
        <View style={ titleTextBlock }>
          <View style={ titleWrapper }>
            <MCIcon
              name='shield-outline'
              size={22}
              style={{ color: '#b49944' }} />
            <Text style={redBook}>{ bird['red-book'] }</Text>
          </View>
        </View>
      ) : null }
    </View>
  )
}

const styles = {
  titleTextBlock: {
    backgroundColor: '#1d1d1d',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 16
  },
  titleLang: {
    color: '#7a7a7a',
    marginRight: 7
  },
  title: {
    color: '#fff'
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  redBook: {
    fontWeight: '100',
    color: '#7a7a7a',
    marginLeft: 10,
    width: '90%'
  }
}

export default SingleBirdTitle;