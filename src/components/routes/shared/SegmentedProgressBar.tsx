import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface SegmentedProgressBarProps {
  total: number;
  done: number;
}

export function SegmentedProgressBar({ total, done }: SegmentedProgressBarProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  if (total <= 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {Array.from({ length: total }).map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.segment,
              {
                backgroundColor:
                  idx < done ? '#14B8A6' : colors.cardBorder,
              },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.text, { color: colors.text }]}>
        {t('routes.visitedOf', {
          done: formatNumber(done),
          total: formatNumber(total),
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    height: 4,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});