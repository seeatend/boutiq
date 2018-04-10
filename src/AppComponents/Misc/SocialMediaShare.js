import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
	StyleSheet,
	View,
	Text,
  TouchableOpacity,
} from 'react-native';

import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  tagSelected: {
    fontSize: 40,
    color: Styles.COLOR_GREEN,
    paddingRight: 30,
    paddingLeft: 30,
  },
  tagUnselected: {
    fontSize: 40,
    color: Styles.COLOR_LIGHTER_5,
    paddingRight: 30,
    paddingLeft: 30,
  },
  wrapper: {
    padding: 10,
    flexWrap: 'wrap',
    flexDirection:'row',
  },
  mediaLabel: {
    flex: 1,
    color: Styles.COLOR_DARKER_45,
  }
});

export class SocialMediaShare extends Component {

  constructor(props) {
    super(props);

    this.toggleSelection = this.toggleSelection.bind(this);

    this.state = {
      selected: false,
    };
  }

  toggleSelection() {
    this.setState({ selected: !this.state.selected });
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.mediaLabel}>Share on </Text>
        <TouchableOpacity
          onPress={this.toggleSelection} >
          <Icon style={ (this.state.selected) ? styles.tagSelected : styles.tagUnselected} name='facebook-square'/>
        </TouchableOpacity>
      </View>
    );
  }
}
