import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Communications from 'react-native-communications';
import { Styles, x } from 'AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  wrapperHeader: {
    height: 80,
    backgroundColor: Styles.COLOR_GREEN,
    justifyContent: 'center'
  },
  headerLetsTalk: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: x - 40,
    height: 40,
  },
  wrapperContent: {
    flex: 1,
    padding: 25,
  },
  textContent: {
    fontSize: 19,
    lineHeight: 30,
    color: Styles.FONT_COLOR,
  },
  emailLink: {
    fontSize: 25,
    fontWeight: '700',
  },
  termLink: {
    fontWeight: '700',
  },
  line: {
    height: 1,
    marginLeft: -25,
    backgroundColor: Styles.COLOR_DARKER_15,
    width: 150,
    marginBottom: 25,
    marginTop: 15,
  }
});

export const Contact = () => (
  <View style={styles.container}>
    <View style={ styles.wrapperHeader }>
      <TouchableOpacity
        style={styles.headerLetsTalk}
        disabled={true}
      >
        <Text style={{ color: Styles.COLOR_DARKER_15, fontSize: 25 }}>
          Let's talk
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.wrapperContent}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textContent}>We'd love to hear from you!</Text>
        <Text style={styles.textContent}>Questions, feedback, you name it.</Text>
        <Text style={styles.textContent}>Reach us on:</Text>
      </View>
      <Text
        style={[styles.textContent, styles.textContent]}
        onPress={() => {
          Communications.email(
              ['discover@boutiq.travel'], null, null, null, null
            );
        }}
      >
        discover@boutiq.travel
      </Text>
      <Text
        style={[styles.textContent, styles.termLink, { marginTop: 20 }]}
        onPress={() => {
          Communications.web('https://www.boutiq.travel/stories/');
        }}
      >
        Check our latest Stories here
      </Text>
      <View style={styles.line} />
      <View style={{ marginTop: 50 }}>
        <Text
          onPress={() => {
            Communications.web('https://static1.squarespace.com/static/5832bec0414fb5e9baaf7e4a/t/58d1b7ab9de4bbc2e56a800c/1490139052833/Boutiq_Terms_and_Conditions.pdf');
          }}
          style={[styles.textContent, styles.textContent]}
        >
          Terms and Conditions
        </Text>
        <Text
          onPress={() => {
            Communications.web('https://static1.squarespace.com/static/5832bec0414fb5e9baaf7e4a/t/583647b646c3c4a5dd5f781d/1479952311155/Boutiq_Privacy_Policy.pdf');
          }}
          style={[styles.textContent, styles.textContent]}
        >
          Privacy Policy
        </Text>
      </View>
    </View>
  </View>
);
