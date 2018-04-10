import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
// import autobind from 'autobind-decorator';
// import _ from 'lodash';
import { styles } from './styles';
import { Styles } from 'AppStyles';
// import { MemberProfileScene } from 'AppScenes';
import {
  UserList,
  Loading,
  NavBarClose,
} from 'AppComponents';
import { Boutiq, User } from 'AppServices';


export class ContactsListScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired,
    contactType: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      isLoading: true,
      currentUser: null,
      user: null,
      dataSource: this.ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    const { contactType } = this.props;
    User.get()
    .then(currentUser => {
      this.setState({
        currentUser
      });
    });

    Boutiq.getProfile(this.props.userId)
    .then(user => {
      this.setState({
        isLoading: false,
        user,
        dataSource: this.ds.cloneWithRows(user[`user_${contactType}`])
      });
    });
  }

  // @autobind
  // renderListItem(rowData) {
  //   const { navigateTo } = this.props;
  //   const contactData = _.pick(rowData.user, 'name', 'propic', 'id', 'public');
  //   return (
  //     <TouchableOpacity
  //       onPress={() => navigateTo({
  //         verb: 'push',
  //         sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
  //         scene: MemberProfileScene,
  //         profileType: 'member',
  //         user: contactData
  //       })}
  //     >
  //       <Contact
  //         navigateTo={navigateTo}
  //         userContact={contactData}
  //         currentUser={this.state.currentUser}
  //         contactType={this.props.contactType}
  //       />
  //     </TouchableOpacity>
  //   );
  // }

  // renderHeader(type) {
  //   const { user } = this.state;
  //   const nb = user[`user_${type}`].length;
  //   const txt = nb < 2 ? 'FOLLOWER' : 'FOLLOWERS';
  //   return (
  //     <View style={{ padding: 15 }}>
  //       <Text style={[styles.textHeader, { textAlign: 'center', marginBottom: 15 }]}>
  //         {this.renderTextHeader()}
  //       </Text>
  //       <Text style={styles.textHeader}>
  //         {`${nb} ${txt}`}
  //       </Text>
  //     </View>
  //   );
  // }

  renderNumberContactType(type) {
    const { user_followers, user_followings, user_friends } = this.state.user;
    switch (type) {
      case 'followers':
        return (
          <View style={{ padding: 15 }}>
            <Text style={[styles.textHeader, { textAlign: 'center', marginBottom: 15 }]}>
              Your fans who trust your advice. Let them know about the places you love.
            </Text>
            <Text style={styles.textHeader}>
              {user_followers.length} {user_followers.length < 2 ? 'FOLLOWER' : 'FOLLOWERS'}
            </Text>
          </View>
        );
      case 'followings':
        return (
          <View style={{ padding: 15 }}>
            <Text style={[styles.textHeader, { textAlign: 'center', marginBottom: 15 }]}>
              Your trusted friends and network. Find new people on Discover.
            </Text>
            <Text style={styles.textHeader}>
              {user_followings.length} {user_followings.length < 2 ? 'FOLLOWING' : 'FOLLOWINGS'}
            </Text>
          </View>
        );
      case 'friends':
        return (
          <View style={{ padding: 15 }}>
            <Text style={[styles.textHeader, { textAlign: 'center', marginBottom: 15 }]}>
              Your inner circle. Bring friends onto Boutiq for more recommendations.
            </Text>
            <Text style={styles.textHeader}>
              {user_friends.length} {user_friends.length < 2 ? 'FRIEND' : 'FRIENDS'}
            </Text>
          </View>
        );
      default:
        return null;
    }
  }

  render() {
    const { contactType, navigateTo } = this.props;
    const { user, isLoading } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    }
    return (
      <View style={styles.wrapper}>
        <NavigationBar
          title={{ title: contactType.toUpperCase(), style: { color: '#FFF' } }}
          tintColor={Styles.COLOR_GREEN}
          leftButton={<NavBarClose {...this.props} />}
        />
        <UserList
          navigateTo={navigateTo}
          type={contactType}
          renderHeader={() => this.renderNumberContactType(contactType)}
          currentUser={this.state.currentUser}
          data={user[`user_${contactType}`]}
        />
      </View>
    );
  }
}
