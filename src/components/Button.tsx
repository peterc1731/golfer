import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {brandGreen, brandYellow, destructive} from '../style/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableWithoutFeedback,
);

interface Props {
  text: string;
  type?: 'primary' | 'secondary' | 'destructive';
  onPress: () => void;
  disabled?: boolean;
}

function Button({text, type, onPress, disabled = false}: Props) {
  const scale = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: withTiming(scale.value, {duration: 100})}],
  }));
  return (
    <AnimatedTouchable
      onPressIn={() => {
        scale.value = 0.95;
      }}
      onPressOut={() => {
        scale.value = 1;
      }}
      onPress={onPress}
      disabled={disabled}
      style={animatedStyles}>
      <View
        style={[
          styles.wrapper,
          type === 'secondary' && styles.secondary,
          type === 'destructive' && styles.destructive,
          disabled && styles.disabled,
        ]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: brandGreen,
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 28,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    fontFamily: 'SFProRounded-Heavy',
    color: '#FFFFFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  secondary: {
    backgroundColor: brandYellow,
  },
  destructive: {
    backgroundColor: destructive,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
