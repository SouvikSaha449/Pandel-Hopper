import {useId} from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg'

interface GradientTileProps {
    size?: number;
    radius?: number;
}

export function GradientTile({ size = 90, radius = 16 }: GradientTileProps) {
  const gradId = useId();

  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: radius }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#F5A623" />
            <Stop offset="1" stopColor="#C8341F" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={size} height={size} rx={radius} fill={`url(#${gradId})`} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
  },
});