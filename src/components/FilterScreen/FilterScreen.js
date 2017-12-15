import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FilterHeader from './FilterHeader';
import FilterContent from './FilterContent';
import { connect } from 'react-redux';
import { resetSearchFields, filterBirds } from '../../actions';
import _ from 'lodash';

class FilterScreen extends Component {

  render() {

    return (
      <View style={{flex: 1}}>
        <FilterHeader
          title="Фильтровать"
          action="main"
          actionType="reset"
          filterNotEmpty={this.props.filterNotEmpty}
          resetSearchFields={this.props.resetSearchFields}
          filterBirds={this.props.filterBirds}
        />
        <FilterContent />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { search } = state;
  const searchClone = _.clone(search);

  delete searchClone.query;

  return {
    filterNotEmpty: !_.isEmpty(searchClone),
  }
}

export default connect(mapStateToProps, { resetSearchFields, filterBirds })(FilterScreen);