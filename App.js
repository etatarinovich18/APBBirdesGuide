import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { StackNavigator } from 'react-navigation';
import MainScreen from './src/components/MainScreen/MainScreen';
import SingleBirdScreen from './src/components/SingleBirdScreen/SingleBirdScreen';

const MainScreenNavigator = StackNavigator({
  Home: {
    screen: MainScreen
  },
  Bird: {
    screen: SingleBirdScreen
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <MainScreenNavigator />
      </Provider>
    );
  }
}

export default App;
