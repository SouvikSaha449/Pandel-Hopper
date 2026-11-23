import { useMemo, useState } from 'react';
import { LayoutAnimation, PanResponder } from 'react-native';

export function useSwipeSheet(initialCollapsed = false) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isDragging, setIsDragging] = useState(false);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed((prev) => !prev);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dy) > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
        onPanResponderGrant: () => {
          setIsDragging(true);
        },
        onPanResponderRelease: (_, gestureState) => {
          setIsDragging(false);
          if (gestureState.dy > 15) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsCollapsed(true);
          } else if (gestureState.dy < -15) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsCollapsed(false);
          }
        },
        onPanResponderTerminate: () => {
          setIsDragging(false);
        },
      }),
    []
  );

  return {
    isCollapsed,
    isDragging,
    toggleCollapse,
    panResponder,
  };
}