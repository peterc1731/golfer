import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ErrorView() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Oops, something went wrong. Restart the app to continue.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  text: {
    textAlign: 'center',
  },
});

export default ErrorView;
