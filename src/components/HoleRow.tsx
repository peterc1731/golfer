import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Haptic from 'react-native-haptic-feedback';

interface Props {
  value: number | undefined;
  onChange: (v: number) => void;
  emoji: string;
}

function HoleRow({value, onChange, emoji}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            Haptic.trigger('impactMedium');
            onChange(value ? value - 1 : 0);
          }}>
          <Text style={styles.text}>–</Text>
        </TouchableOpacity>
        <View style={styles.circle}>
          {emoji ? (
            <Text style={styles.emoji}>{emoji}</Text>
          ) : (
            <Text style={styles.par}>PAR</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            Haptic.trigger('impactMedium');
            onChange(value ? (value < 9 ? value + 1 : value) : 1);
          }}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.score}>{value || '0'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    height: 80,
    backgroundColor: '#F9D65D',
    borderRadius: 40,
  },
  score: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 52,
    color: '#51D58E',
    textAlign: 'center',
    minWidth: 40,
  },
  text: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 52,
    color: '#DABA4C',
    marginBottom: 5,
  },
  emoji: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 39,
    color: '#DABA4C',
    marginBottom: 1,
  },
  par: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 24,
    color: 'white',
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DABA4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 28,
  },
});

export default HoleRow;
