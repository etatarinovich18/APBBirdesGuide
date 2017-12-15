import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import FilterOption from './FilterOption';
import { connect } from 'react-redux';

class FilterContent extends Component {

  render() {

    return (
      <ScrollView>
        <FilterOption chosen={this.props.search.razm} title="Размер" screen="filterSize" />
        <FilterOption chosen={this.props.search['place']} title="Место" screen="filterPlace"/>
        <FilterOption chosen={this.props.search['year-time']} title="Сезон" screen="filterSeason" />
        <FilterOption chosen={this.props.search['color']} title="Цвет оперения" screen="filterColor" />
        {/*<FilterOption title="Клюв" />*/}
        {/*<FilterOption title="Поведение" />*/}
        {/*<FilterOption title="Цвет ног" />*/}
        {/*<FilterOption title="Семейство" />*/}
        {/*<FilterOption title="Отряд" />*/}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const { search } = state;

  return { search }
}

export default connect(mapStateToProps)(FilterContent);
