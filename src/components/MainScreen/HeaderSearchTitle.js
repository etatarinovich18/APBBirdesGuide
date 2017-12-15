import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, Animated } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { filterBirds } from '../../actions';

class MainScreenHeader extends Component {

  state = {
    showSearch: false,
    fadeAnimSearch: new Animated.Value(0),
    fadeAnimTitle: new Animated.Value(1)
  }

  componentDidMount() {
    this.props.search.query !== '' && this.toggleSearch();
  }

  componentDidUpdate() {
    Animated.parallel([
      Animated.timing(
        this.state.fadeAnimSearch,
        {
          toValue: this.state.showSearch ? 1 : 0,
          duration: 300,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.state.fadeAnimTitle,
        {
          toValue: this.state.showSearch ? 0 : 1,
          duration: 300,
          useNativeDriver: true
        }
      ),
    ]).start()
  }

  toggleSearch = () => {
    this.state.showSearch &&
      this.props.filterBirds({ ...this.props.search, query: '' }, this.props.sort);

    // set focus after animation finishes
    setTimeout(() => {
      this.inputRef && this.inputRef.focus();
    }, 400);

    this.setState({
      showSearch: !this.state.showSearch,
    });
  }

  render() {
    const {
      headerContainer,
      mainWrapper,
      headerText,
      searchIcon,
      searchWrapper,
      searchIconTextInput,
      textInput,
      closeSearch
    } = styles;

    return (
      <View style={headerContainer}>
        {this.state.showSearch ? (
          <Animated.View style={{ ...searchWrapper, opacity: this.state.fadeAnimSearch }}>
            <TextInput
              ref={ (ref) => this.inputRef = ref }
              onChangeText={(text) => this.props.filterBirds({ ...this.props.search, query: text } , this.props.sort)}
              value={this.props.search.query}
              style={textInput}
              underlineColorAndroid='transparent'
            />
            <FAIcon style={searchIconTextInput} name="search" color="#b49944" size={20} />
            <TouchableWithoutFeedback onPress={ this.toggleSearch }>
              <EntypoIcon style={closeSearch} name="cross" color="#b49944" size={24} />
            </TouchableWithoutFeedback>
          </Animated.View>
        ) : (
          <Animated.View style={{ ...mainWrapper, opacity: this.state.fadeAnimTitle}}>
            <Text style={headerText}>Птицы</Text>
            <TouchableWithoutFeedback onPress={ this.toggleSearch }>
              <FAIcon style={searchIcon} name="search" color="#b49944" size={20} />
            </TouchableWithoutFeedback>
          </Animated.View>
        )}

      </View>
    )
  }
}

const styles = {
  headerContainer: {
    height: 56,
    backgroundColor: '#1d1c1c',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainWrapper: {
    flexDirection: 'row',
    position: 'relative',
    flex: 1
  },
  headerText: {
    color: '#b49944',
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    fontWeight: 'bold',
    marginTop: -3
  },
  searchIcon: {
    position: 'absolute',
    right: 14,
    top: 4
  },
  searchWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 40
  },
  searchIconTextInput: {
    position: 'absolute',
    left: 26,
    top: 8
  },
  textInput: {
    backgroundColor: '#1d1c1c',
    color: '#b49944',
    height: 36,
    flex: 1,
    borderColor: '#b49944',
    borderRadius: 24,
    borderWidth: 1,
    paddingLeft: 35,
    paddingBottom: 9,
    paddingTop: 10
  },
  closeSearch: {
    position: 'absolute',
    right: 10,
    top: 6
  }
};

const mapStateToProps = state => {
  return {
    search: state.search,
    sort: state.sort
  }
}

export default connect( mapStateToProps, { filterBirds } )(MainScreenHeader);
