import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
  Image,
  TouchableOpacity,
	TextInput,
} from 'react-native';
import { ProfilePhoto } from 'AppComponents';
import { Styles, x } from 'AppStyles';
import { tracker } from 'AppServices';

const styles = StyleSheet.create({
  wrapperPostStatus: {
    marginTop: Styles.GUTTER,
    marginBottom: Styles.GUTTER,
    flexDirection: 'row',
    width: x,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Styles.COLOR_WHITE,
    padding: 10,
  },
  textInput: {
    width: x / 1.4,
    height: 40,
    padding: 8,
    fontSize: 20,
    color: Styles.FONT_COLOR,
  }
});

export class PostStatus extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    const { text } = this.state;
    this.props.onPress({ text });
    tracker.event({ category: 'post', action: 'postStatus' });
  }
  render() {
    return (
      <View style={styles.wrapperPostStatus}>
        <ProfilePhoto source={this.props.user.propic} type="square" size={30} border={false} />
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ text })}
          placeholder="Post a status"
          value={this.state.text}
          onSubmitEditing={this.onPress}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={this.onPress}>
          <Image
            style={{ width: 26, height: 26 }}
            source={require('../../../assets/compose@1x.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
