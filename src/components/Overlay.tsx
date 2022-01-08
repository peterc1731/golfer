import {useKeyboard} from '@react-native-community/hooks';
import React, {useEffect} from 'react';
import {
  Dimensions,
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
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {overlayHeightState} from '../state/overlay';
import {backgroundColor} from '../style/colors';

interface Props {
  onClose: () => void;
  open: boolean;
}

const OVERLAY_DISPLACEMENT = 250;

const Overlay: React.FC<Props> = ({children, onClose, open}) => {
  const opacity = useSharedValue(0);
  const zIndex = useSharedValue(-1);
  const extraHeight = useRecoilValue(overlayHeightState);
  const yPos = useSharedValue(OVERLAY_DISPLACEMENT);
  const {keyboardHeight} = useKeyboard();
  useEffect(() => {
    if (open) {
      opacity.value = withTiming(0.27, {duration: 200});
      if (keyboardHeight > 0) {
        yPos.value = withTiming(-keyboardHeight - extraHeight, {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        });
      }
      zIndex.value = 2;
    } else {
      opacity.value = withTiming(0, {duration: 200});
      yPos.value = withTiming(OVERLAY_DISPLACEMENT, {
        duration: 350,
        easing: Easing.inOut(Easing.ease),
      });
      zIndex.value = withDelay(350, withTiming(-1, {duration: 0}));
    }
  }, [open, opacity, yPos, zIndex, keyboardHeight, extraHeight]);
  const animatedContainerStyles = useAnimatedStyle(() => ({
    transform: [{translateY: yPos.value}],
  }));
  const animatedWrapperStyles = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0,0,0,${opacity.value})`,
    zIndex: zIndex.value,
  }));
  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {start: number}
  >({
    onStart: (_, ctx) => {
      ctx.start = yPos.value;
    },
    onActive: (event, ctx) => {
      yPos.value = ctx.start + event.translationY;
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
  return (
    <Animated.View style={[styles.wrapper, animatedWrapperStyles]}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fill} />
      </TouchableWithoutFeedback>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.container, animatedContainerStyles]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 2,
    bottom: -Dimensions.get('screen').height,
    left: 0,
  },
  container: {
    position: 'relative',
    height: Dimensions.get('screen').height + OVERLAY_DISPLACEMENT,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowColor: '#000000',
    backgroundColor,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  fill: {flex: 1},
});

export default Overlay;
