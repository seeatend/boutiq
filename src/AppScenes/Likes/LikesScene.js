import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import autobind from 'autobind-decorator';
import { styles } from './styles';
import { Styles } from 'AppStyles';
import {
  UserList,
  Loading,
  NavBarClose,
} from 'AppComponents';
import { Boutiq, User } from 'AppServices';


export class LikesScene extends Component {
  static propTypes = {
    reviewId: PropTypes.number.isRequired,
    contactType: PropTypes.string.isRequired,
    navigateTo: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      entries: null,
      isLoading: true,
      currentUser: null,
      user: null,
    };
  }

  componentDidMount() {
    User.get()
    .then(currentUser => {
      this.setState({
        currentUser
      });
    });

    Boutiq.getEntityLikes({ entity: 'reviews', entity_id: this.props.reviewId })
    .then(({ entries }) => {
      this.setState({
        entries,
        isLoading: false,
      });
    })
    .catch(() => Alert.alert(
      'Warning',
      'Sorry, something went wrong',
      [
        { text: 'OK', onPress: () => {
          this.setState({
            isLoading: false,
          });
        } },
      ]
    ));
  }

  @autobind
  renderNumberContactType() {
    const { entries } = this.state;
    return (
      <View style={{ padding: 15 }}>
        <Text style={styles.textHeader}>
          {entries.length} {entries.length < 2 ? 'LIKE' : 'LIKES'}
        </Text>
      </View>
    );
  }

  render() {
    const { contactType, navigateTo } = this.props;
    if (this.state.isLoading) {
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
          renderHeader={this.renderNumberContactType}
          type={contactType}
          data={this.state.entries}
          currentUser={this.state.currentUser}
        />
      </View>
    );
  }
}
