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
    <View style={styles.statsRow}>

      <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="location-sharp" size={18} color="#FF7043" />
        <Text style={[styles.statValue, { color: colors.text }]}>
          {formatNumber(stopsCount)}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textMuted }]}>
          {t('complete.pujas')}
        </Text>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="walk" size={18} color="#4ADE80" />
        <Text style={[styles.statValue, { color: colors.text }]}>
          {formatNumber(km.toFixed(1))} km
        </Text>
        <Text style={[styles.statLabel, { color: colors.textMuted }]}>
          {t('complete.walked')}
        </Text>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons name="time" size={18} color="#60A5FA" />
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
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginVertical: 14,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});