import React, { Component, PropTypes } from 'react';
import {
  ListView,
  TouchableOpacity,
  Navigator,
} from 'react-native';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { MemberProfileScene } from 'AppScenes';
import { Contact } from 'AppComponents';
import { Styles } from 'AppStyles';

export class UserList extends Component {
  static propTypes = {
    type: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    renderHeader: PropTypes.func,
    navigateTo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: [],
    renderHeader: _.noop,
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      currentUser: props.currentUser,
      dataSource: this.ds.cloneWithRows(props.data),
    };
    this.type = props.type;
  }

  @autobind
  renderRow(rowData) {
    const { navigateTo } = this.props;
    const userData = _.pick(rowData.user, 'name', 'propic', 'id', 'isFollowing', 'isFollower');
    return (
      <TouchableOpacity
        onPress={() => navigateTo({
          verb: 'push',
          sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
          scene: MemberProfileScene,
          profileType: 'member',
          user: userData
        })}
      >
        <Contact
          userContact={userData}
          currentUser={this.state.currentUser}
          contactType={this.props.type}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        style={{ backgroundColor: Styles.COLOR_WHITE }}
        renderHeader={this.props.renderHeader}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
