import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface RouteEditorPillsProps {
  stopsCount: number;
  totalMinutes: number;
  km: number;
}

export function RouteEditorPills({
  stopsCount,
  totalMinutes,
  km,
}: RouteEditorPillsProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const durationText =
    hours > 0
      ? t('common.duration', { h: formatNumber(hours), m: formatNumber(minutes) })
      : t('common.minutes', { m: formatNumber(minutes) });

  return (
    <View style={styles.pillsRow}>
      <View style={[styles.pill, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="trail-sign-outline" size={14} color={colors.accent} />
        <Text style={[styles.pillText, { color: colors.text }]}>
          {t('common.pujas', { count: formatNumber(stopsCount) })}
        </Text>
      </View>

      <View style={[styles.pill, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="time-outline" size={14} color={colors.accent} />
        <Text style={[styles.pillText, { color: colors.text }]}>
          {durationText}
        </Text>
      </View>

      <View style={[styles.pill, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="footsteps-outline" size={14} color={colors.accent} />
        <Text style={[styles.pillText, { color: colors.text }]}>
          {t('common.km', { km: formatNumber(km.toFixed(1)) })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
});