import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { Boutiq, User, helpers } from 'AppServices';
import {
  NavBarClose,
  Loading
} from 'AppComponents';
import { x, y, Styles } from 'AppStyles';

const styles = StyleSheet.create({
  navigation: {
    height: 45,
    borderBottomWidth: 2,
    borderColor: Styles.COLOR_DARKER_30
  },
  wrapperSettingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  textSettingItem: {
    width: x - 115
  }
});

export class ProfileSettingsScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentUser: null,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  componentWillMount() {
    User.get()
    .then(({ id }) => {
      return Boutiq.getProfile(id)
      .then(currentUser => (
        this.setState({
          currentUser,
        })
      ));
    })
    .catch(message => console.error(message))
    .then(() => this.setState({
      isLoading: false,
    }));
  }

  updateValue(value) {
    const { settings } = this.state;
    return _.indexOf(settings, value) >= 0;
  }

  @autobind
  handlingSettings(activityId) {
    const { user_activities: userActivities } = this.state.currentUser;
    const indexItemInUserActivities = _.findIndex(userActivities, item => item.id === activityId);
    const filtered = userActivities.filter(item => item.id !== activityId);
    const findItemInUserActivities = _.find(userActivities, item => item.id === activityId);
    const cloneItem = _.clone(findItemInUserActivities);
    cloneItem.enabled = !cloneItem.enabled;
    const newUserActivities = helpers.insert(filtered, indexItemInUserActivities, cloneItem);
    this.setState({
      currentUser: Object.assign({}, this.state.currentUser, { user_activities: newUserActivities })
    });
  }

  @autobind
  onClose() {
    const { currentUser } = this.state;
    const notifsIdEnabled = currentUser.user_activities.reduce((memo, item) => {
      if (item.enabled) {
        memo.push(item.id);
      }
      return memo;
    }, []);
    const user = _.pick(currentUser, ['name', 'email']);
    const payload = { user, activity_types: notifsIdEnabled };
    return User.saveActivity(payload)
    .then(res => res)
    .catch(message => console.error(message))
    .then(() => this.props.navigator.pop());
  }

  render() {
    const { currentUser, isLoading } = this.state;
    if (isLoading) {
      return <Loading style={{ color: '#666' }} />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavigationBar
          title={{ title: 'SETTINGS', style: { color: 'white' } }}
          style={styles.navigation}
          tintColor={Styles.COLOR_GREEN}
          leftButton={<NavBarClose onClose={this.onClose} />}
        />
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 30 }}>
            Notify me when:
          </Text>
          {currentUser.user_activities.sort(({ id }, { id: id2 }) => id > id2)
          .map(({ display_name: displayName, name, enabled, id }, index) => {
            return (
              <View key={index} style={styles.wrapperSettingItem}>
                <Text style={styles.textSettingItem}>
                  {displayName}
                </Text>
                <Switch
                  onTintColor={Styles.COLOR_GREEN}
                  value={enabled}
                  onValueChange={() => this.handlingSettings(id)}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
