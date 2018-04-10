import React, { PropTypes } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Styles, x } from 'AppStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    backgroundColor: Styles.COLOR_LIGHTER_0,
    width: x - 30,
  },
  input: {
    fontSize: 20,
    color: Styles.COLOR_DARKER_45,
    height: 40,
    alignSelf: 'center',
    width: x - 70,
  },
});

export const SearchInput = ({ styleContainer, iconName, handleTextInput, placeholder }) => (
  <View style={[styles.container, styleContainer]}>
    <Icon name={iconName} size={24} color={Styles.COLOR_DARKER_15} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(text) => {handleTextInput(text);}}
    />
  </View>
);

SearchInput.propTypes = {
  styleContainer: PropTypes.object,
  iconName: PropTypes.string,
  placeholder: PropTypes.string,
  handleTextInput: PropTypes.func
};
SearchInput.defaultProps = {
  iconName: 'search',
  placeholder: 'Search'
};
