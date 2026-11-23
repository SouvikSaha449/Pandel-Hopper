import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';
import { pujaName, type Puja } from '@/data/pujas';
import { SegmentedProgressBar } from '@/components/routes';

interface HudExpandedViewProps {
  totalStops: number;
  visitedCount: number;
  nextStopIndex: number;
  nextPuja: Puja;
  walkMinutes?: number;
  onArrive: () => void;
  onOpenRoute: () => void;
  onGoNext?: () => void;
}

export function HudExpandedView({
  totalStops,
  visitedCount,
  nextStopIndex,
  nextPuja,
  walkMinutes,
  onArrive,
  onOpenRoute,
  onGoNext,
}: HudExpandedViewProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const lang = usePrefs((s) => s.lang);
  const formatNumber = useNumber();

  return (
    <>
      <SegmentedProgressBar total={totalStops} done={visitedCount} />

      <View style={styles.nextStopRow}>
        <View style={[styles.stopBadge, { backgroundColor: colors.accent }]}>
          <Text style={[styles.stopNumber, { color: colors.bg }]}>
            {formatNumber(nextStopIndex + 1)}
          </Text>
        </View>

        <View style={styles.nextStopContent}>
          <Text style={[styles.nextStopLabel, { color: colors.accent }]}>
            {t('map.nextStop')}
          </Text>
          <Text style={[styles.pujaName, { color: colors.text }]} numberOfLines={1}>
            {pujaName(nextPuja, lang)}
          </Text>
          {walkMinutes !== undefined && (
            <Text style={[styles.walkText, { color: colors.textMuted }]}>
              {t('common.minWalk', { n: formatNumber(walkMinutes) })}
            </Text>
          )}
        </View>
      </View>

      <Pressable
        style={[styles.arriveBtn, { backgroundColor: colors.accent }]}
        onPress={onArrive}
      >
        <Ionicons name="checkmark" size={18} color={colors.bg} />
        <Text style={[styles.arriveText, { color: colors.bg }]}>
          {t('routes.iAmHere')}
        </Text>
      </Pressable>

      <View style={styles.secondaryRow}>
        <Pressable
          style={[
            styles.secondaryBtn,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
          onPress={onOpenRoute}
        >
          <Text style={[styles.secondaryText, { color: colors.text }]}>
            {t('map.openRoute')}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.secondaryBtn,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
          onPress={onGoNext}
        >
          <Ionicons name="navigate-outline" size={15} color={colors.accent} />
          <Text style={[styles.secondaryText, { color: colors.text }]}>
            {t('map.goNext')}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nextStopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stopBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  nextStopContent: {
    flex: 1,
    gap: 2,
  },
  nextStopLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  pujaName: {
    fontSize: 17,
    fontWeight: '700',
  },
  walkText: {
    fontSize: 13,
    fontWeight: '500',
  },
  arriveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
  },
  arriveText: {
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 22,
    borderWidth: 1,
    gap: 6,
  },
  secondaryText: {
    fontSize: 13,
    fontWeight: '700',
  },
});