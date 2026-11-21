import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPuja, pujaName } from '@/data/pujas';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';

interface RouteCompleteStopsProps {
  stops: string[];
}

export function RouteCompleteStops({ stops }: RouteCompleteStopsProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();
  const lang = usePrefs((s) => s.lang);

  const previewStops = stops.slice(0, 3);
  const remainingCount = Math.max(0, stops.length - 3);

  if (previewStops.length === 0) return null;

  return (
    <View style={[styles.stopsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <Text style={[styles.stopsHeader, { color: colors.textMuted }]}>
        {t('complete.yourStops')}
      </Text>

      <View style={styles.stopsList}>
        {previewStops.map((stopId) => {
          const puja = getPuja(stopId);
          if (!puja) return null;
          return (
            <View key={stopId} style={styles.stopRow}>
              <Ionicons name="checkmark-circle" size={18} color="#4ADE80" />
              <Text style={[styles.stopName, { color: colors.text }]} numberOfLines={1}>
                {pujaName(puja, lang)}
              </Text>
            </View>
          );
        })}
      </View>

      {remainingCount > 0 && (
        <View style={styles.moreChip}>
          <Text style={[styles.moreText, { color: colors.textMuted }]}>
            {t('complete.more', { n: formatNumber(remainingCount) })}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stopsCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  stopsHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  stopsList: {
    gap: 10,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stopName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  moreChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 2,
  },
  moreText: {
    fontSize: 12,
    fontWeight: '600',
  },
});