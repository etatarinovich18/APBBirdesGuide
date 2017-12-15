import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FilterCheckBox } from '../../common';
import FilterHeader from '../FilterHeader';
import { setArraySearchField, filterBirds } from '../../../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class FilterSize extends Component {

  applyFilter = () => {
    this.props.filterBirds(this.props.search, this.props.sort);

    Actions.main({type: 'reset', fromFilter: true});
  }

  render() {

    const {
      containerStyle,
      buttonStyle,
      buttonTextStyle,
      buttonWrapperStyle
    } = styles;
    const {
      'year-time': yearTime
    } = this.props.search;

    return (
      <View style={{flex: 1, position: 'relative'}}>
        <FilterHeader title="Размер" action="filterMain" />
        <View style={containerStyle}>
          <FilterCheckBox label="Зима" field="year-time" value="year-time-1zz" setArraySearchField={this.props.setArraySearchField} marked={yearTime && yearTime.indexOf('year-time-1zz') !== -1} />
          <FilterCheckBox label="Весна" field="year-time" value="year-time-2zz" setArraySearchField={this.props.setArraySearchField} marked={yearTime && yearTime.indexOf('year-time-2zz') !== -1} />
          <FilterCheckBox label="Лето" field="year-time" value="year-time-3zz" setArraySearchField={this.props.setArraySearchField} marked={yearTime && yearTime.indexOf('year-time-3zz') !== -1} />
          <FilterCheckBox label="Осень" field="year-time" value="year-time-4zz" setArraySearchField={this.props.setArraySearchField} marked={yearTime && yearTime.indexOf('year-time-4zz') !== -1} />
        </View>
        <TouchableOpacity style={buttonWrapperStyle} onPress={this.applyFilter}>
          <View style={buttonStyle}>
            <Text style={buttonTextStyle}>Применить</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    paddingLeft: 19,
    paddingRight: 20
  },
  buttonWrapperStyle: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  buttonStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#928660',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 14
  }
};

const mapStateToProps = state => {
  return {
    search: state.search,
    sort: state.sort
  }
};

export default connect(mapStateToProps, { setArraySearchField, filterBirds })(FilterSize);
