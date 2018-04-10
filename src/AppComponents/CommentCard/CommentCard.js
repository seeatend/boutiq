import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
  Text,
} from 'react-native';
import { ProfilePhoto } from 'AppComponents';
import { Styles, x } from 'AppStyles';

const styles = StyleSheet.create({
  wrapperPostStatus: {
    marginTop: 10,
    flexDirection: 'row',
    width: x,
    // height: 90,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
});

export class CommentCard extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    // data: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { data, currentUser, comment } = this.props;
    console.log("commentCard", comment);
    return (
      <View style={styles.wrapperPostStatus}>
        <View style={{ marginRight: 10 }}>
          <ProfilePhoto source={comment.user.propic} type="circle" size={30} border={false} />
        </View>
        <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
          {comment.user.name}
        </Text>
        <Text>
          {comment.text}
        </Text>
      </View>
    );
  }
}
