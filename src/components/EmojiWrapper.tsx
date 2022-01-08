import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface Props {
  children: React.ReactNode;
  emoji: string;
  onPress: () => void;
}

function EmojiWrapper({children, emoji, onPress}: Props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableWithoutFeedback>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
});

export default EmojiWrapper;
