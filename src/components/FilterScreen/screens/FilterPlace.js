import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FilterCheckBox } from '../../common';
import FilterHeader from '../FilterHeader';
import { setArraySearchField, filterBirds } from '../../../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class FilterPlace extends Component {

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
      place
    } = this.props.search;

    return (
      <View style={{flex: 1, position: 'relative'}}>
        <FilterHeader title="Место" action="filterMain" />
        <View style={containerStyle}>
          <FilterCheckBox label="Город (поселок, дача)" field="place" value="place-1zz" setArraySearchField={this.props.setArraySearchField} marked={place && place.indexOf('place-1zz') !== -1} />
          <FilterCheckBox label="Лес или парк" field="place" value="place-2zz" setArraySearchField={this.props.setArraySearchField} marked={place && place.indexOf('place-2zz') !== -1} />
          <FilterCheckBox label="Поле" field="place" value="place-3zz" setArraySearchField={this.props.setArraySearchField} marked={place && place.indexOf('place-3zz') !== -1} />
          <FilterCheckBox label="Луг" field="place" value="place-4zz" setArraySearchField={this.props.setArraySearchField} marked={place && place.indexOf('place-4zz') !== -1} />
          <FilterCheckBox label="Река или водоем" field="place" value="place-5zz" setArraySearchField={this.props.setArraySearchField} marked={place && place.indexOf('place-5zz') !== -1} />
          <FilterCheckBox label="Болото" field="place" value="place-6zz" setArraySearchField={this.props.setArraySearchField} marked={place && place.indexOf('place-6zz') !== -1} />
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

export default connect(mapStateToProps, { setArraySearchField, filterBirds })(FilterPlace);
