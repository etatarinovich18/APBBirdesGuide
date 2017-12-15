import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
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
      color
    } = this.props.search;

    return (
      <View style={{flex: 1, position: 'relative'}}>
        <FilterHeader title="Цвет оперения" action="filterMain" />
        <ScrollView style={containerStyle}>
          <FilterCheckBox label="Черный" field="color" value="color-1zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-1zz') !== -1} />
          <FilterCheckBox label="Серый" field="color" value="color-2zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-2zz') !== -1} />
          <FilterCheckBox label="Белый" field="color" value="color-3zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-3zz') !== -1} />
          <FilterCheckBox label="Кремовый" field="color" value="color-4zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-4zz') !== -1} />
          <FilterCheckBox label="Желтый" field="color" value="color-5zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-5zz') !== -1} />
          <FilterCheckBox label="Оранжевый" field="color" value="color-6zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-6zz') !== -1} />
          <FilterCheckBox label="Красный" field="color" value="color-7zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-7zz') !== -1} />
          <FilterCheckBox label="Коричневый" field="color" value="color-8zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-8zz') !== -1} />
          <FilterCheckBox label="Фиолетовый / Розовый" field="color" value="color-9zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-9zz') !== -1} />
          <FilterCheckBox label="Синий" field="color" value="color-10zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-10zz') !== -1} />
          <FilterCheckBox label="Зеленый" field="color" value="color-11zz" setArraySearchField={this.props.setArraySearchField} marked={color && color.indexOf('color-11zz') !== -1} />
        </ScrollView>
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
    paddingRight: 20,
    flex: 1
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
