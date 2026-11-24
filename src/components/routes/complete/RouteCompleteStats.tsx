import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface RouteCompleteStatsProps {
  stopsCount: number;
  km: number;
  durationText: string;
}

export function RouteCompleteStats({
  stopsCount,
  km,
  durationText,
}: RouteCompleteStatsProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  return (
    <View
      style={[
        styles.statsCard,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >

      <View style={styles.statCol}>
        <Ionicons name="location-sharp" size={18} color={colors.accent} />
        <Text style={[styles.statValue, { color: colors.text }]}>
          {formatNumber(stopsCount)}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textMuted }]}>
          {t('complete.pujas')}
        </Text>
      </View>

      <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />

      <View style={styles.statCol}>
        <Ionicons name="walk" size={18} color="#4ADE80" />
        <Text style={[styles.statValue, { color: colors.text }]}>
          {formatNumber(km.toFixed(1))} km
        </Text>
        <Text style={[styles.statLabel, { color: colors.textMuted }]}>
          {t('complete.walked')}
        </Text>
      </View>

      <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />

      <View style={styles.statCol}>
        <Ionicons name="time-outline" size={18} color="#60A5FA" />
        <Text style={[styles.statValue, { color: colors.text }]} numberOfLines={1}>
          {durationText}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textMuted }]}>
          {t('complete.total')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});