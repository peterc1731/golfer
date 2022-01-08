import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Game} from '../state/game';
import {brandGreen, brandYellow, lightGrey, midGrey} from '../style/colors';
import FlexContainer from './FlexContainer';
import Spacer from './Spacer';

interface Props {
  item: Game;
  onPress: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableWithoutFeedback,
);

function GameItem({item, onPress}: Props) {
  const scale = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: withTiming(scale.value, {duration: 100})}],
  }));
  return (
    <AnimatedTouchable
      style={animatedStyles}
      onPressIn={() => {
        scale.value = 0.95;
      }}
      onPressOut={() => {
        scale.value = 1;
      }}
      onPress={onPress}>
      <View style={[styles.wrapper, item.complete && styles.complete]}>
        <FlexContainer>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.row}>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={[styles.location, styles.bull]}>&bull;</Text>
            <Text style={styles.location}>{item.date}</Text>
          </View>
          <Spacer height={14} />
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={[styles.location, styles.light]}>
              {item.players
                .filter(p => p.name)
                .map(p => p.name)
                .join(', ')}
            </Text>
            {!item.complete && item.started && (
              <Text style={[styles.location, styles.light]}>in progress</Text>
            )}
            {!item.started && (
              <Text style={[styles.location, styles.light]}>not started</Text>
            )}
          </View>
        </FlexContainer>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brandYellow,
    borderRadius: 10,
    marginTop: 15,
    padding: 12,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  location: {
    fontFamily: 'SFProRounded-Heavy',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: midGrey,
  },
  complete: {
    backgroundColor: brandGreen,
  },
  row: {flexDirection: 'row'},
  bull: {marginHorizontal: 9, fontSize: 16},
  light: {color: lightGrey},
  spaceBetween: {justifyContent: 'space-between'},
});

export default GameItem;
