import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface MapDownloadCardProps {
  progress: number;
  downloaded: number;
  total: number;
}

export function MapDownloadCard({
  progress,
  downloaded,
  total,
}: MapDownloadCardProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const num = useNumber();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          {t('welcome.downloading')}
        </Text>
        <Text style={[styles.percentText, { color: colors.accent }]}>
          {num(progress)}%
        </Text>
      </View>

      <View style={[styles.progressTrack, { backgroundColor: colors.track }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: colors.accent },
          ]}
        />
      </View>

      <View style={styles.cardFooter}>
        <Text style={[styles.subText, { color: colors.textMuted }]}>
          {t('welcome.ofMb', { done: num(downloaded), total: num(total) })}
        </Text>
        <Text style={[styles.subText, { color: colors.textMuted }]}>
          {t('welcome.wifi')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  percentText: {
    fontSize: 16,
    fontWeight: '800',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  subText: {
    fontSize: 13,
    fontWeight: '500',
  },
});