import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import BirdsCard from './BirdsCard';
import { connect } from 'react-redux';

class BirdsList extends Component {

  constructor(props) {
    super(props);
    this.createDataSource(props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);

    if (this.props.sort.lang !== nextProps.sort.lang || this.props.sort.size !== nextProps.sort.size) {
      // http://stackoverflow.com/questions/33806255/how-to-scroll-to-the-top-of-a-listview-in-react-native
      this.refs.birdsList.getScrollResponder().scrollTo({x: 0, y: 0, animated: true});
    }
  }

  createDataSource = (props) => {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.dataSource = ds.cloneWithRows(props.birds);
  }

  renderBirdsCard = bird => {
    return (
      <BirdsCard bird={bird} query={this.props.query} navigation={this.props.navigation}/>
    )
  }

  render() {


    return (
      <View style={{flex: 1, borderWidth: 1, borderColor: '#f1f1f1'}}>
        <ListView
          ref="birdsList"
          dataSource={this.dataSource}
          renderRow={this.renderBirdsCard}
          enableEmptySections={true}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { birds, sort } = state;
  const { query } = state.search;

  return { birds, query, sort };
}

export default connect(mapStateToProps)(BirdsList);
