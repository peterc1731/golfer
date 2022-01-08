import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {backgroundColor} from '../style/colors';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
}

function ScreenContainer({children, scroll = false}: Props) {
  return (
    <SafeAreaView style={styles.wrapper} edges={['top', 'right', 'left']}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.content}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor,
  },
  wrapper: {
    flex: 1,
    backgroundColor,
  },
});

export default ScreenContainer;
