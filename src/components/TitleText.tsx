import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TitleText: React.FC = ({children}) => (
  <Text style={styles.text}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 42,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.49)',
    marginLeft: 20,
  },
});

export default TitleText;
