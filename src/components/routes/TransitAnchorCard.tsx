import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber } from '@/i18n';

interface TransitAnchorCardProps {
  type: 'start' | 'end';
  stationName: string;
  walkMinutes: number;
}

export function TransitAnchorCard({
  type,
  stationName,
  walkMinutes,
}: TransitAnchorCardProps) {
  const colors = useTheme();
  const formatNumber = useNumber();

  const isStart = type === 'start';
  const accentColor = isStart ? '#4ADE80' : '#F87171';
  const badgeBg = isStart ? 'rgba(34, 197, 94, 0.15)' : 'rgba(248, 113, 113, 0.15)';
  const badgeLabel = isStart ? 'START TRANSIT' : 'EXIT TRANSIT';
  const walkLabel = isStart
    ? `${formatNumber(walkMinutes)} min walk to Stop 1`
    : `${formatNumber(walkMinutes)} min walk to metro`;

  return (
    <View style={styles.container}>
      {/* 1. Connector line ABOVE for Exit Transit */}
      {!isStart && (
        <View style={styles.connectorRow}>
          <View style={[styles.verticalLine, { backgroundColor: colors.cardBorder }]} />
          <View style={styles.walkInfo}>
            <Ionicons name="walk" size={14} color={colors.textMuted} />
            <Text style={[styles.walkText, { color: colors.textMuted }]}>{walkLabel}</Text>
          </View>
        </View>
      )}

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={[styles.iconBox, { backgroundColor: badgeBg }]}>
          <Ionicons name="subway" size={20} color={accentColor} />
        </View>

        <Text style={[styles.stationName, { color: colors.text }]} numberOfLines={1}>
          {stationName}
        </Text>

        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.badgeText, { color: accentColor }]}>{badgeLabel}</Text>
        </View>
      </View>

      {isStart && (
        <View style={styles.connectorRow}>
          <View style={[styles.verticalLine, { backgroundColor: colors.cardBorder }]} />
          <View style={styles.walkInfo}>
            <Ionicons name="walk" size={14} color={colors.textMuted} />
            <Text style={[styles.walkText, { color: colors.textMuted }]}>{walkLabel}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  card: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  connectorRow: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 31,
  },
  verticalLine: {
    width: 2,
    height: '100%',
  },
  walkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 16,
  },
  walkText: {
    fontSize: 12,
    fontWeight: '500',
  },
});