import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
  TouchableOpacity,
} from 'react-native';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection:'row',
    width: 150,
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  tagSelected: {
    backgroundColor: Styles.COLOR_GREEN,
    color: Styles.COLOR_WHITE,
    width: 33,
    paddingRight: 2,
    paddingLeft: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: Styles.FONT_SIZE_SMALLER_NEW,
    textAlign: 'center'
  },
});

export class PlaceCardTags extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      selected: false,
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.props.tags.map((label, idx) => (
          <Text style={styles.tagSelected} key={idx}>{label}</Text>
        ))}
      </View>
    );
  }
}

