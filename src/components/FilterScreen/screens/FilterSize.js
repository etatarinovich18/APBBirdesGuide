import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FilterRadioButton } from '../../common';
import FilterHeader from '../FilterHeader';
import { setSearchField, filterBirds } from '../../../actions';
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
      razm
    } = this.props.search;

    return (
      <View style={{flex: 1, position: 'relative'}}>
        <FilterHeader title="Размер" action="filterMain" />
        <View style={containerStyle}>
          <FilterRadioButton label="С воробья или меньше" field="razm" value="razmer-1" setSearchField={this.props.setSearchField} marked={razm === 'razmer-1'} />
          <FilterRadioButton label="С дрозда или меньше" field="razm" value="razmer-2" setSearchField={this.props.setSearchField} marked={razm === 'razmer-2'} />
          <FilterRadioButton label="С голубя или меньше" field="razm" value="razmer-3" setSearchField={this.props.setSearchField} marked={razm === 'razmer-3'} />
          <FilterRadioButton label="С крякву или меньше" field="razm" value="razmer-4" setSearchField={this.props.setSearchField} marked={razm === 'razmer-4'} />
          <FilterRadioButton label="Больше кряквы" field="razm" value="razmer-5" setSearchField={this.props.setSearchField} marked={razm === 'razmer-5'} />
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

export default connect(mapStateToProps, { setSearchField, filterBirds })(FilterSize);
