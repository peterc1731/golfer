import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  children: React.ReactNode;
}

function Center({children}: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default Center;
