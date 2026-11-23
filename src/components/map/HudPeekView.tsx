import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';
import { pujaName, type Puja } from '@/data/pujas';

interface HudPeekViewProps {
  nextStopIndex: number;
  nextPuja: Puja;
  walkMinutes?: number;
  onArrive: () => void;
}

export function HudPeekView({
  nextStopIndex,
  nextPuja,
  walkMinutes,
  onArrive,
}: HudPeekViewProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const lang = usePrefs((s) => s.lang);
  const formatNumber = useNumber();

  return (
    <View style={styles.peekRow}>
      <View style={[styles.peekBadge, { backgroundColor: colors.accent }]}>
        <Text style={[styles.peekBadgeText, { color: colors.bg }]}>
          {formatNumber(nextStopIndex + 1)}
        </Text>
      </View>

      <View style={styles.peekInfo}>
        <Text style={[styles.peekName, { color: colors.text }]} numberOfLines={1}>
          {pujaName(nextPuja, lang)}
        </Text>
        {walkMinutes !== undefined && (
          <Text style={[styles.walkText, { color: colors.textMuted }]}>
            {t('common.minWalk', { n: formatNumber(walkMinutes) })}
          </Text>
        )}
      </View>

      <Pressable
        style={[styles.peekArriveBtn, { backgroundColor: colors.accent }]}
        onPress={onArrive}
      >
        <Ionicons name="checkmark" size={16} color={colors.bg} />
        <Text style={[styles.peekArriveText, { color: colors.bg }]}>
          {t('routes.iAmHere')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  peekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  peekBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  peekBadgeText: {
    fontSize: 14,
    fontWeight: '800',
  },
  peekInfo: {
    flex: 1,
    gap: 2,
  },
  peekName: {
    fontSize: 15,
    fontWeight: '700',
  },
  walkText: {
    fontSize: 12,
    fontWeight: '500',
  },
  peekArriveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    gap: 4,
  },
  peekArriveText: {
    fontSize: 13,
    fontWeight: '700',
  },
});