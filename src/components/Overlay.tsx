import React, {useEffect} from 'react';
import {
  Dimensions,
  InputAccessoryView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {backgroundColor} from '../style/colors';

interface Props {
  onClose: () => void;
  open: boolean;
}

const OVERLAY_DISPLACEMENT = 400;

const Overlay: React.FC<Props> = ({children, onClose, open}) => {
  const yPos = useSharedValue(0);
  const animatedContainerStyles = useAnimatedStyle(() => ({
    transform: [{translateY: yPos.value}],
  }));
  useEffect(() => {
    if (open) {
      yPos.value = 0;
    }
  }, [yPos, open]);
  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {start: number}
  >({
    onStart: (_, ctx) => {
      ctx.start = yPos.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY > 0) {
        yPos.value = ctx.start + event.translationY;
      }
    },
    onEnd: (event, ctx) => {
      if (event.translationY > OVERLAY_DISPLACEMENT / 2) {
        yPos.value = withTiming(
          OVERLAY_DISPLACEMENT,
          {duration: 200, easing: Easing.inOut(Easing.ease)},
          f => {
            if (f) {
              runOnJS(onClose)();
            }
          },
        );
      } else {
        yPos.value = withTiming(ctx.start, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        });
      }
    },
  });
  return open ? (
    <Animated.View style={styles.wrapper} entering={FadeIn} exiting={FadeOut}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fill} />
      </TouchableWithoutFeedback>
      <InputAccessoryView>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.container, animatedContainerStyles]}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </InputAccessoryView>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 2,
    bottom: -Dimensions.get('screen').height,
    left: 0,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.27)',
  },
  container: {
    position: 'relative',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowColor: '#000000',
    backgroundColor,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  fill: {flex: 1},
});

export default Overlay;
