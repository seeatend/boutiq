import React, { PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ProfilePhoto, FollowButton } from 'AppComponents';
import { styles } from './styles';

const getTextButton = (currentUserFollowings, user) => {
  let text = 'follow';
  currentUserFollowings.map(following => {
    if (following === user.name) {
      text = 'Following';
    }
    return text;
  });
  return text;
};

export const Contact = ({ currentUser, userContact, contactType, handleFollowAction }) => {
  const currentUserFollowings = currentUser.user_followings.map(({ user }) => user.name);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ProfilePhoto
          type="circle"
          source={userContact.propic}
          size={40}
          border={false}
        />
      </View>
      <View style={{ flex: 2, alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 12 }}>
          {userContact.name}
        </Text>
      </View>
        <View style={{ flex: 2, alignItems: 'flex-end' }}>
        {
          currentUser.name !== userContact.name &&
          <FollowButton
            userId={userContact.id}
            textButton={getTextButton(currentUserFollowings, userContact)}
            contactType={contactType}
          />
        }
        </View>
    </View>
  );
};

Contact.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userContact: PropTypes.object.isRequired,
  contactType: PropTypes.string.isRequired,
};
