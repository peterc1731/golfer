import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Confetti from './Confetti';

interface Props {
  emoji: string;
  score: number;
  name: string;
}

const Winner: React.FC<Props> = ({emoji, score, name}) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.winnerText}>{name} wins</Text>
    <Text style={styles.score}>{score}</Text>
    <Confetti />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    height: 140,
    backgroundColor: 'rgba(208, 192, 108, 0.15)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  winnerText: {
    width: 80,
    textAlign: 'center',
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.57)',
  },
  emoji: {
    width: 100,
    fontSize: 76,
    textAlign: 'center',
  },
  score: {
    width: 100,
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 76,
    color: '#51D58E',
    textAlign: 'center',
  },
});

export default Winner;
