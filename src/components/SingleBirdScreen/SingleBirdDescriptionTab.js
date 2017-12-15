import React from 'react';
import { View, Text } from 'react-native';

const SingleBirdDescriptionTab = ({ bird }) => {
  return (
    <View>
      <Text>{ bird.descr }</Text>
    </View>
  )
}

export default SingleBirdDescriptionTab;