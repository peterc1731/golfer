import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Game} from '../state/game';
import {
  brandGreen,
  brandRed,
  brandYellow,
  lightGrey,
  midGrey,
} from '../style/colors';
import FlexContainer from './FlexContainer';
import Spacer from './Spacer';

const DELETE_WIDTH = 100;

interface Props {
  item: Game;
  onPress: () => void;
  onDelete: () => void;
}

function GameItem({item, onPress, onDelete}: Props) {
  const scale = useSharedValue(1);
  const offset = useSharedValue(0);
  const collapse = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(scale.value, {duration: 100}),
      },
      {
        translateX: offset.value,
      },
    ],
  }));
  const animatedCollapseStyles = useAnimatedStyle(() => ({
    maxHeight: 100 * collapse.value,
    marginTop: 15 * collapse.value,
    opacity: collapse.value,
  }));
  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {initial: number}
  >({
    onStart: (_, ctx) => {
      ctx.initial = offset.value;
    },
    onActive: (event, ctx) => {
      offset.value = ctx.initial + event.translationX;
    },
    onEnd: event => {
      if (event.translationX < -DELETE_WIDTH) {
        offset.value = withTiming(-DELETE_WIDTH, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        });
      } else if (event.translationX > DELETE_WIDTH) {
        offset.value = withTiming(DELETE_WIDTH, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        });
      } else {
        offset.value = withTiming(0, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        });
      }
    },
  });

  const bestScore = (game: Game) =>
    game.players
      .map(p => ({
        score: game.holes.map(h => h[p.name]).reduce((sum, v) => sum + v, 0),
        name: p.name,
        emoji: p.emoji,
      }))
      .sort((a, b) => a.score - b.score)[0];

  const deleteItem = () => {
    Alert.alert('Delete Game', 'Are you sure you want to delete this game?', [
      {style: 'cancel', text: 'Cancel', onPress: () => {}},
      {
        style: 'destructive',
        text: 'Delete',
        onPress: () => {
          collapse.value = withTiming(
            0,
            {duration: 300},
            complete => complete && runOnJS(onDelete)(),
          );
        },
      },
    ]);
  };

  return (
    <Animated.View style={[styles.background, animatedCollapseStyles]}>
      <TouchableWithoutFeedback
        onPress={deleteItem}
        containerStyle={[styles.delete, styles.stickRight]}>
        <Text style={styles.title}>DELETE</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={deleteItem}
        containerStyle={[styles.delete, styles.stickLeft]}>
        <Text style={styles.title}>DELETE</Text>
      </TouchableWithoutFeedback>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[animatedStyles, styles.onTop]}>
          <TouchableWithoutFeedback onPress={onPress}>
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
                    <Text style={[styles.location, styles.light]}>
                      in progress
                    </Text>
                  )}
                  {!item.started && (
                    <Text style={[styles.location, styles.light]}>
                      not started
                    </Text>
                  )}
                  {item.complete && (
                    <Text style={[styles.location, styles.light]}>
                      Best Score: {bestScore(item).score}
                    </Text>
                  )}
                </View>
              </FlexContainer>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brandYellow,
    borderRadius: 10,
    padding: 12,
  },
  background: {
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: brandRed,
    marginHorizontal: 20,
    position: 'relative',
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
  delete: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: DELETE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickLeft: {
    left: 0,
  },
  stickRight: {
    right: 0,
  },
  onTop: {
    zIndex: 2,
  },
});

export default GameItem;
