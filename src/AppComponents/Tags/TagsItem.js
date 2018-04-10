import React, { Component, PropTypes } from 'react';
import {
  View,
	StyleSheet,
	Text,
  TouchableOpacity,
} from 'react-native';
import { Styles, x } from 'AppStyles';

const styles = StyleSheet.create({
  tagSelected: {
    backgroundColor: Styles.COLOR_GREEN,
  },
  tag: {
    backgroundColor: Styles.COLOR_WHITE,
    borderWidth: 1,
    marginHorizontal: 1,
    borderColor: Styles.COLOR_GREEN,
    width: x / 6,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTag: {
    color: Styles.COLOR_GREEN,
    fontSize: 13,
  }
});

export class TagsItem extends Component {

  static propTypes ={
    onPress: PropTypes.func,
    label: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection() {
    this.setState({ selected: !this.state.selected });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.selected != prevState.selected){
      this.props.onPress();
    }
  }
  render() {
    const { selected } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.toggleSelection}
        style={[styles.tag, selected && styles.tagSelected]}
      >
        <Text style={[styles.textTag, selected && { color: '#fff' }]}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}
