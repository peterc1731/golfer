import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

function DashedLine() {
  return (
    <View style={styles.container}>
      {Array.from({length: Math.ceil(Dimensions.get('screen').width / 13)}).map(
        (_, i) => (
          <View style={styles.dash} key={i} />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 5,
    overflow: 'hidden',
  },
  dash: {
    backgroundColor: 'rgba(0, 0, 0, 0.19)',
    height: 1,
    width: 8,
    marginRight: 5,
  },
});

export default DashedLine;
