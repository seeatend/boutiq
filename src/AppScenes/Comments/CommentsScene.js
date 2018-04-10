import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  ListView,
  StyleSheet
} from 'react-native';
import autobind from 'autobind-decorator';
import { Styles, x, y } from 'AppStyles';
import {
  CommentCard,
  NavBarClose,
} from 'AppComponents';
import { fixtureData } from './fixturesComments';
import { fixtureCurrentUser } from './fixtureCurrentUser';
import NavigationBar from 'react-native-navbar';

const styles = StyleSheet.create({
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: x * 0.8,
    paddingHorizontal: 7,
    paddingVertical: 7,
    fontSize: 20,
    color: Styles.FONT_COLOR,
  },
  sendButton: {
    width: x * 0.2,
    // height: 40,
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export class CommentsScene extends Component {
  static propTypes = {
    // data: PropTypes.object.isRequired,
    // data: PropTypes.shape(ReviewModel.schema),
    // currentUser: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      height: 0,
      comment: '',
      isLoading: false,
      dataSource: this.ds.cloneWithRows(fixtureData.comments)
    };
  }

  onPress() {
    console.log('should add comment');
  }

  @autobind
  renderListItem(rowData) {
    // console.log("rwodata json", JSON.stringify(rowData));
    // console.log("currentUser json", JSON.stringify(this.props.currentUser));
    // console.log("data json", JSON.stringify(this.props.data));
    return <CommentCard comment={rowData} data={fixtureData} currentUser={fixtureCurrentUser} />;
  }

  render() {
    console.log("CURRENT USERRRR", fixtureCurrentUser);
    return (
      <View style={{ flex: 1, backgroundColor: Styles.COLOR_LIGHTER_3 }}>
        <NavigationBar
          title={{ title: 'Comments', style: { color: '#FFF' } }}
          tintColor={Styles.COLOR_GREEN}
          leftButton={<NavBarClose {...this.props} />}
        />
        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderListItem}
          />
          <KeyboardAvoidingView
            style={{ position: 'absolute', top: y - 105 }}
            keyboardVerticalOffset={-80 - this.state.height}
            behavior="position"
          >
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              multiline={true}
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height });
              }}
              style={[styles.textInput, { height: Math.max(40, this.state.height) }]}
              onChangeText={comment => this.setState({ comment })}
              placeholder="Write a comment"
              value={this.state.comment}
              onSubmitEditing={this.onPress}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendButton, { height: Math.max(40, this.state.height) }]}
            >
              <Text style={{ color: Styles.COLOR_GREEN }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
