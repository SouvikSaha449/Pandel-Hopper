import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { type Puja } from '@/data/pujas';
import { useSwipeSheet } from '@/hooks/use-swipe-sheet';
import { HudPeekView } from '@/components/map/HudPeekView';
import { HudExpandedView } from '@/components/map/HudExpandedView';

interface RouteLiveHudProps {
  totalStops: number;
  visitedCount: number;
  nextStopIndex: number;
  nextPuja: Puja | null;
  walkMinutes?: number;
  onArrive: () => void;
  onOpenRoute: () => void;
  onGoNext?: () => void;
}

export function RouteLiveHud(props: RouteLiveHudProps) {
  const colors = useTheme();
  const { isCollapsed, isDragging, toggleCollapse, panResponder } = useSwipeSheet();

  if (!props.nextPuja) return null;

  return (
    <View
      style={[
        styles.hudCard,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 30, right: 30 }}
        onPress={toggleCollapse}
        style={styles.handleContainer}
      >
        <View
          style={[
            styles.handle,
            {
              backgroundColor: isDragging ? colors.accent : colors.cardBorder,
              width: isDragging ? 48 : 36,
            },
          ]}
        />
      </Pressable>

      {isCollapsed ? (
        <HudPeekView
          nextStopIndex={props.nextStopIndex}
          nextPuja={props.nextPuja}
          walkMinutes={props.walkMinutes}
          onArrive={props.onArrive}
        />
      ) : (
        <HudExpandedView
          {...props}
          nextPuja={props.nextPuja}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hudCard: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  handleContainer: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    height: 4,
    borderRadius: 2,
  },
});