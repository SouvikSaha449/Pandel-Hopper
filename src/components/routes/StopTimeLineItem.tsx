import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface StopTimelineItemProps {
  index: number;
  isLast: boolean;
  isVisited: boolean;
  isNext: boolean;
  isActive: boolean;
  pujaName: string;
  metroInfo?: string;
  walkFromPrev?: number | null;
  onToggleVisited?: () => void;
}

export function StopTimelineItem({
  index,
  isLast,
  isVisited,
  isNext,
  isActive,
  pujaName,
  metroInfo,
  walkFromPrev,
  onToggleVisited,
}: StopTimelineItemProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  return (
    <View style={styles.container}>

      {!isLast ? (
        <View
          style={[
            styles.timelineLine,
            {
              backgroundColor: isVisited ? colors.pinVisited : colors.cardBorder,
            },
          ]}
        />
      ) : null}

      <View
        style={[
          styles.timelineNode,
          {
            backgroundColor: isVisited
              ? colors.pinVisited
              : isNext
              ? colors.accentBg
              : colors.card,
            borderColor: isVisited
              ? colors.pinVisited
              : isNext
              ? colors.accent
              : colors.cardBorder,
          },
        ]}
      >
        {isVisited ? (
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        ) : (
          <Text
            style={[
              styles.nodeIndex,
              { color: isNext ? colors.accent : colors.textMuted },
            ]}
          >
            {formatNumber(index + 1)}
          </Text>
        )}
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: isNext ? colors.accent : colors.cardBorder,
          },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={[styles.title, { color: colors.text }]}>{pujaName}</Text>

          {metroInfo ? (
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              {metroInfo}
            </Text>
          ) : null}

          {walkFromPrev && index > 0 ? (
            <Text style={[styles.walkLeg, { color: colors.textMuted }]}>
              <Ionicons name="walk" size={12} color={colors.textMuted} />{' '}
              {t('common.minWalk', { n: formatNumber(walkFromPrev) })}
            </Text>
          ) : null}
        </View>

        {isActive ? (
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isVisited }}
            onPress={onToggleVisited}
            style={styles.checkToggle}
          >
            <Ionicons
              name={isVisited ? 'checkbox' : 'square-outline'}
              size={24}
              color={isVisited ? colors.pinVisited : colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 15,
    top: 32,
    bottom: -16,
    width: 2,
    zIndex: 0,
  },
  timelineNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  nodeIndex: {
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
  },
  walkLeg: {
    fontSize: 11,
    marginTop: 2,
  },
  checkToggle: {
    padding: 4,
    marginLeft: 8,
  },
});