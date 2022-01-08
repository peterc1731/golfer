import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
}

function FlexContainer({children, scroll = false}: Props) {
  return scroll ? (
    <ScrollView style={styles.container} keyboardDismissMode="interactive">
      {children}
    </ScrollView>
  ) : (
    <View style={styles.container}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FlexContainer;
