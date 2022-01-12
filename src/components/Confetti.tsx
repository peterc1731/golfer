import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const colors = [
  '#24CC7B',
  '#FED043',
  '#F98C38',
  '#59E0FF',
  '#9562FF',
  '#FB77B6',
];

function ConfettiItem({
  item: {color, width, height, borderRadius},
}: {
  item: {color: string; width: number; height: number; borderRadius: number};
}) {
  const xMax = Dimensions.get('window').width - 44;
  const yMax = 140;
  const [start] = useState(Math.round(Math.random() * 250));
  const [end] = useState(yMax + Math.round(Math.random() * 250));
  const x = useSharedValue(Math.round(Math.random() * xMax));
  const y = useSharedValue(-start);
  const rotation = useSharedValue(0);
  useEffect(() => {
    y.value = withRepeat(
      withSequence(
        withTiming(end, {
          duration: 2000 + Math.round(Math.random() * 2000),
          easing: Easing.bezier(
            Math.random() * 0.5,
            Math.random() * 0.5,
            Math.random() * 0.5,
            Math.random() * 0.5,
          ),
        }),
        withTiming(-start, {
          duration: 2000 + Math.round(Math.random() * 2000),
          easing: Easing.bezier(
            Math.random() * 0.5,
            Math.random() * 0.5,
            Math.random() * 0.5,
            Math.random() * 0.5,
          ),
        }),
      ),
      -1,
    );
    x.value = withRepeat(
      withTiming(x.value - 100 + Math.round(Math.random() * 200), {
        duration: 1000 + Math.round(Math.random() * 2000),
      }),
      -1,
      true,
    );
    rotation.value = withRepeat(
      withTiming(360, {duration: 1000 + Math.round(Math.random() * 1000)}),
      -1,
    );
  }, [y, x, end, start, rotation]);
  const animatedStyle = useAnimatedStyle(() => ({
    top: y.value,
    left: x.value,
    transform: [{rotate: `${rotation.value}deg`}],
  }));
  return (
    <Animated.View
      style={[
        {backgroundColor: color, width, height, borderRadius},
        styles.item,
        animatedStyle,
      ]}
    />
  );
}

function Confetti() {
  const [items] = useState(
    Array.from({length: 20}, () => {
      const size = Math.ceil(Math.random() * 10);
      return {
        color: colors[Math.round(Math.random() * colors.length)],
        width: 5 + size,
        height: 15 + size,
        borderRadius: (5 + size) / 4,
      };
    }),
  );
  return (
    <View style={styles.container}>
      {items.map((item, i) => (
        <ConfettiItem item={item} key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  item: {position: 'absolute'},
});

export default Confetti;
