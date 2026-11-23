import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import type { CompletedHop } from '@/types/routes';

interface HistoryCardProps {
  item: CompletedHop;
  onPress: () => void;
  onWalkAgain: () => void;
  onDelete: () => void;
}

export function HistoryCard({ item, onPress, onWalkAgain, onDelete }: HistoryCardProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  // Humanized duration
  const hours = Math.floor(item.minutes / 60);
  const mins = item.minutes % 60;
  const durationText =
    hours > 0
      ? t('common.duration', { h: formatNumber(hours), m: formatNumber(mins) })
      : t('common.minutes', { m: formatNumber(mins) });

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      {/* Tappable Content Area (90% width) */}
      <Pressable
        style={styles.content}
        onPress={onPress}
        onLongPress={onDelete}
        android_ripple={{ color: 'rgba(255,255,255,0.05)' }}
      >
        <View style={styles.topRow}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.date, { color: colors.textMuted }]}>
            {new Date(item.finishedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>

        <Text style={[styles.meta, { color: colors.textMuted }]} numberOfLines={1}>
          {t('common.pujas', { count: formatNumber(item.stopsCount) })} ·{' '}
          {formatNumber(item.km.toFixed(1))} km · {durationText}
        </Text>
      </Pressable>

      {/* Sibling Re-hop Icon Button (10% width) */}
      <Pressable
        hitSlop={10}
        style={[styles.iconBtn, { borderColor: colors.cardBorder }]}
        onPress={onWalkAgain}
        android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: true }}
      >
        <Ionicons name="reload" size={15} color={colors.accent} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
  meta: {
    fontSize: 13,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});