import React  from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const SingleBirdTabs = ({ tabs, onTabPress, activeTab }) => {
  return (
    <ScrollView horizontal={ true } style={{ flexDirection: 'row', backgroundColor: '#1d1d1d' }}>
      { tabs.map(( tab, index ) => {
        let style = { ... styles.tab };

        if (activeTab === tab.name) {
          style = { ...style, ...styles.activeTab }
        }

        return (
          <TouchableOpacity onPress={() => onTabPress(tab)} key={index}>
            <View style={style} >
              <Text style={{ ...styles.tabText, color: activeTab === tab.name ? '#fff' : '#7a7a7a' }}>{ tab.text }</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = {
  tab: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 20,
    color: '#7a7a7a'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#c2a855'
  }
};

export default SingleBirdTabs;