import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { User, helpers } from 'AppServices';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Styles.COLOR_PINK,
    borderWidth: 1
  }
});

export class FollowButton extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    textButton: PropTypes.string,
    backgroundColor: PropTypes.object,
    textColor: PropTypes.string,
    contactType: PropTypes.string,
  }

  static defaultProps = {
    textColor: 'green',
    textButton: 'Follow'
  };

  constructor(props) {
    super(props);
    this.state = {
      textValue: helpers.capitalize(props.textButton)
    };
    this.toggleText = this.toggleText.bind(this);
  }

  toggleText() {
    const { textValue } = this.state;
    this.setState({
      textValue: textValue === 'Following' ? 'Follow' : 'Following'
    });
    const action = textValue === 'Follow' ? 'follow' : 'unfollow';
    // User[action](this.props.userId)
    // .then(res => console.log("res", res))
    // .catch(error => console.log("errr", error))
  }

  render() {
    const { textValue } = this.state;
    const { contactType } = this.props;
    return (
      <TouchableOpacity
        disabled={true}
        // disabled={contactType === 'followings'}
        style={[styles.container,
          { backgroundColor: textValue === 'Following' ? Styles.COLOR_PINK : '#fff' }]}
        onPress={() => {this.toggleText();}}
      >
        <Text style={{ color: textValue === 'Following' ? '#fff' : Styles.COLOR_PINK }}>
          {this.state.textValue}
        </Text>
      </TouchableOpacity>
    );
  }
}
