import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { GradientTile } from './GradientTile';

interface RouteCardProps {
  title: string;
  subtitle?: string;
  stopsCount: number;
  minutes: number;
  progress?: { done: number; total: number };
  onPress: () => void;
}

export function RouteCard({
  title,
  subtitle,
  stopsCount,
  minutes,
  progress,
  onPress,
}: RouteCardProps) {
  const colors = useTheme();
  const { t } = useTranslation();

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const durationText =
    hours > 0 ? t('common.duration', { h: hours, m: mins }) : t('common.minutes', { m: mins });

  const pct =
    progress && progress.total > 0
      ? Math.min(100, Math.round((progress.done / progress.total) * 100))
      : 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <View style={styles.topRow}>
        <GradientTile />
        <View style={styles.titleCol}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.textMuted }]} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={[styles.metaText, { color: colors.text }]}>
            {t('common.pujas', { count: stopsCount })}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={15} color={colors.textMuted} />
          <Text style={[styles.metaText, { color: colors.text }]}>{durationText}</Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="walk-outline" size={15} color={colors.textMuted} />
          <Text style={[styles.metaText, { color: colors.text }]}>
            {t('routes.mostlyWalking')}
          </Text>
        </View>
      </View>

      {progress ? (
        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <Text style={[styles.visitedText, { color: colors.text }]}>
              {t('routes.visitedOf', { done: progress.done, total: progress.total })}
            </Text>
            <Text style={[styles.continueText, { color: colors.accent }]}>
              {t('common.continue')}
            </Text>
          </View>
          <View style={[styles.track, { backgroundColor: colors.track }]}>
            <View style={[styles.fill, { width: `${pct}%`, backgroundColor: colors.accent }]} />
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
   topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  titleCol: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 16,
    lineHeight:21,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,          // was 14 (saves 8px)
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,           
  },
  metaText: {
    fontSize: 12,     
    fontWeight: '500',
  },
  progressSection: {
    gap: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visitedText: {
    fontSize: 13,
    fontWeight: '600',
  },
  continueText: {
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});