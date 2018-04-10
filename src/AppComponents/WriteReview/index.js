import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Styles } from 'AppStyles';

export class WriteReview extends Component {

  constructor(props) {
    super(props);

    this.launchImageLibrary = this.launchImageLibrary.bind(this);

    this.state = {
      text: '',
      backgroundColor: '#ededed',
      color: 'white'
    };
  }


  launchImageLibrary() {
      let options = {
        title: 'Select Avatar',
        customButtons: [
          {name: 'fb', title: 'Choose Photo from Facebook'},
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      }

    ImagePicker.launchImageLibrary(options, (response)  => {
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>Write a review</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(text) => this.setState({text})}
        placeholder='What do you think?'/>
        <TouchableOpacity
          style={styles.wrapperG}
           onPress={this.launchImageLibrary} >
          <Icon name='camera' style={styles.plusIcon}/>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputContainer: {
    height: 200,
    borderColor: Styles.COLOR_LIGHTER_5,
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
    color: Styles.COLOR_DARKER_45,
  },
  wrapperG: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 40,
    alignSelf: 'center',
  },
  plusIcon: {
    borderColor: Styles.COLOR_LIGHTER_5,
    borderWidth: 1,
    borderRadius: 30,
    fontSize: 40,
    padding: 10,
    color: Styles.COLOR_PINK,
  }
});
