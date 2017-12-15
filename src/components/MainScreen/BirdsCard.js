import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Highlighter  from 'react-native-highlight-words';
import { APBImage } from '../common';
// import { Actions } from 'react-native-router-flux';

export default BirdsCard = ({ bird, query, navigation }) => {
  const {
    cardStyle,
    cardTextWrapperStyle,
    cardTextTitle,
    cardText,
    cardTextContent
  } = styles;
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Bird', { bird: bird })}>
      <View style={cardStyle}>
        <View>
          <APBImage source={bird['entity-photo']} width={90} height={80} />
        </View>
        <View style={cardTextWrapperStyle}>
          <Highlighter
            searchWords={[query]}
            highlightStyle={{
              backgroundColor: '#b49944'
            }}
            style={cardTextTitle}
            textToHighlight={bird['name_rus']}
          />
          <View style={cardTextContent}>
            <Highlighter
              searchWords={[query]}
              highlightStyle={{
                backgroundColor: '#b49944'
              }}
              style={cardText}
              textToHighlight={`Лат. ${bird['title-lat']}`}
            />
            <Highlighter
              searchWords={[query]}
              highlightStyle={{
                backgroundColor: '#b49944'
              }}
              style={cardText}
              textToHighlight={`Бел. ${bird['title-bel']}`}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
  cardStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f6f7',
  },
  cardTextWrapperStyle: {
    marginLeft: 14,
    marginTop: 5,
    flex: 1,
    paddingRight: 10
  },
  cardTextTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c2c2c',
    lineHeight: 19
  },
  cardTextContent: {
    marginTop: 4
  },
  cardText: {
    fontSize: 12,
  }
}
