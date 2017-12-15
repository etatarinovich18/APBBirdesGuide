import React, { Component } from 'react';
import { View, BackAndroid } from 'react-native';
import MainScreenHeader from './MainScreenHeader';
import BirdsList from './BirdsList';
import { filterBirds } from '../../actions';
import { setSortField } from '../../actions';
import { resetSortFields } from '../../actions';
import { connect } from 'react-redux';

class MainScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 0
    }
  };

  state = {
    sortModalVisible: false
  }

  componentWillMount() {
    !this.props.fromFilter && this.props.filterBirds();
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.setState({
        sortModalVisible: false
      });

      return false;
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  toggleSortModal = () => {
    this.setState({
      sortModalVisible: !this.state.sortModalVisible
    });
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <MainScreenHeader {...this.props}
                          sortModalVisible={this.state.sortModalVisible}
                          toggleSortModal={this.toggleSortModal} />
        <BirdsList {...this.props} />
      </View>
    )
  }

}

const mapStateToProps = state => {
  return {
    birdsCount: state.birds.length,
    hasSearch: state.search.query !== '',
    sort: state.sort,
    search: state.search
  }
}

export default connect(mapStateToProps, { filterBirds, setSortField, resetSortFields })(MainScreen);
