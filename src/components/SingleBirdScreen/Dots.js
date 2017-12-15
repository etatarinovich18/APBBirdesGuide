import React  from 'react';
import { View } from "react-native";

const Dots = ({ total, index }) => {
  const dots = [];

  for (let i = 0; i < total; i++) {
    dots.push(i);
  }

  return (
    <View style={styles.dotsWrapper}>
      {
        dots.map((dot) => {
          return (
            <View key={dot} style={{backgroundColor: dot === index ? '#c2a855' : 'white', ...styles.dot}} />
          )
        })
      }
    </View>
  )
}

const styles = {
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 3,
    marginBottom: 3
  },
  dotsWrapper: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 15
  }
}

export default Dots;