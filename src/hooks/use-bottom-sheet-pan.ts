import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

interface UseBottomSheetPanOptions {
  snapHalf: number;
  snapFull: number;
  onDismiss: () => void;
}

export function useBottomSheetPan({
  snapHalf,
  snapFull,
  onDismiss,
}: UseBottomSheetPanOptions) {
  const currentSnap = useRef<'half' | 'full'>('half');
  const sheetHeight = useRef(new Animated.Value(snapHalf)).current;

  const snapTo = (snap: 'half' | 'full') => {
    currentSnap.current = snap;
    Animated.spring(sheetHeight, {
      toValue: snap === 'half' ? snapHalf : snapFull,
      damping: 26,
      stiffness: 240,
      useNativeDriver: false,
    }).start();
  };

  const resetToHalf = () => {
    currentSnap.current = 'half';
    sheetHeight.setValue(snapHalf);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
      onPanResponderMove: (_, g) => {
        const base = currentSnap.current === 'half' ? snapHalf : snapFull;
        const target = Math.min(snapFull, Math.max(120, base - g.dy));
        sheetHeight.setValue(target);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy < -50 || g.vy < -0.5) {
          snapTo('full');
        } else if (g.dy > 80 || g.vy > 0.6) {
          if (currentSnap.current === 'full') {
            snapTo('half');
          } else {
            onDismiss();
          }
        } else {
          snapTo(currentSnap.current);
        }
      },
    })
  ).current;

  return {
    sheetHeight,
    panHandlers: panResponder.panHandlers,
    snapTo,
    resetToHalf,
    currentSnap,
  };
}