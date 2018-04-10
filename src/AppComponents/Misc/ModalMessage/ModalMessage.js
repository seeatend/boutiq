import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Modal, Image, Text } from 'react-native';
import _ from 'lodash';
import { styles, iconSize } from './styles';
import { Styles } from 'AppStyles';

const renderButtons = (buttons) => {
  const buttonObject = _.map(buttons, (button, index) => (
    <View key={index} style={styles.buttonArea}>
      <TouchableOpacity
        disabled={button.disabled}
        style={styles.buttonAction}
        onPress={() => button.action()}
      >
        <Text style={{ color: Styles.COLOR_PINK, textAlign: 'center' }}>{button.title}</Text>
      </TouchableOpacity>
    </View>
  ));
  return (
    <View style={styles.buttonContainer}>
      {buttonObject}
    </View>
  );
};

export const ModalMessage = ({ messageTitle, messageCore, buttons, icon, onClose }) => (
  <Modal
    transparent={false}
    style={styles.modal}
    onRequestClose={() => {}}
  >
    <TouchableOpacity
      onPress={onClose}
      style={{ flex: 1, opacity: 1, backgroundColor: Styles.COLOR_DARKER_15 }}
    >
    <View style={styles.viewContainer}>
      <View style={[styles.messageContainer, { flex: 1.6 }]}>
        <Text style={styles.message}>{messageTitle}</Text>
        <Text style={[styles.message, { fontWeight: '500' }]}>{messageCore}</Text>
      </View>
      {renderButtons(buttons)}
    </View>
    </TouchableOpacity>
  </Modal>
);

ModalMessage.propTypes = {
  messageTitle: PropTypes.string,
  messageCore: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  })).isRequired,
  onClose: PropTypes.func.isRequired
};

ModalMessage.defaultProps = {
  buttons: {
    disabled: false,
  }
};
