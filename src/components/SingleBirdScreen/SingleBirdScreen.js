import React, { Component }  from 'react';
import { View, Text } from "react-native";

import SingleBirdImageSlider from './SingleBirdImageSlider';
import SingleBirdTitle from "./SingleBirdTitle";
import SingleBirdTabs from "./SingleBirdTabs";
import SingleBirdAudioTab from "./SingleBirdAudioTab";
import SingleBirdDescriptionTab from "./SingleBirdDescriptionTab";
import SingleBirdFeaturesTab from "./SingleBirdFeaturesTab";

class SingleBirdScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.bird.name_rus,
    headerStyle: {
      height: 56,
      backgroundColor: '#1d1c1c',
      elevation: 0
    },
    headerTintColor: '#b49944',
    headerTitleStyle: {
      width: '80%',
      color: '#b49944',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  });

  constructor(props) {
    super(props);

    this.tabs = [
      {
        name: 'audio',
        text: 'Голос',
        component: SingleBirdAudioTab
        // component: SingleBirdFeaturesTab
      },
      {
        name: 'description',
        text: 'Описание',
        component: SingleBirdDescriptionTab
      },
      {
        name: 'feeatures',
        text: 'Отличительные особенности',
        component: SingleBirdFeaturesTab
      }
    ];
    this.state = {
      soundError: false,
      activeTab: 'audio'
    };
  }

  onTabPress = (tab) => {
    this.setState({
      activeTab: tab.name
    });
  }

  render() {
    const { bird }  = this.props.navigation.state.params;
    const tab = React.createElement(this.tabs.find((tab) => tab.name === this.state.activeTab).component, { bird });

    return (
      <View>
        <SingleBirdImageSlider gallery={ bird.gallery.split(',') } birdId={ bird.id } />
        <SingleBirdTitle bird={ bird } />
        <SingleBirdTabs tabs={this.tabs} activeTab={this.state.activeTab} onTabPress={this.onTabPress}/>
        <View>
          { tab }
        </View>
      </View>
    )
  };
}

export default SingleBirdScreen;
