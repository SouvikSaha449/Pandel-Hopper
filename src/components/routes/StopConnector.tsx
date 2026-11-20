import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface StopConnectorProps {
  walkMinutes: number;
}

export function StopConnector({ walkMinutes }: StopConnectorProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  return (
    <View style={styles.container}>
      <View style={[styles.verticalLine, { backgroundColor: colors.cardBorder }]} />
      <View style={styles.infoRow}>
        <Ionicons name="walk" size={14} color={colors.textMuted} />
        <Text style={[styles.walkText, { color: colors.textMuted }]}>
          {t('common.minWalk', { n: formatNumber(walkMinutes) })}
          {walkMinutes >= 10 ? ` (${t('common.approx')})` : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 29,
  },
  verticalLine: {
    width: 2,
    height: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 16,
  },
  walkText: {
    fontSize: 12,
    fontWeight: '500',
  },
});