import React from 'react';
import {StyleSheet, View} from 'react-native';
import {backgroundColor} from '../style/colors';

const ButtonContainer: React.FC = ({children}) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: 'row',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
});

export default ButtonContainer;
