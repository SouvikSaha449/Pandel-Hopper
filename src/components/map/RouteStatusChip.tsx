import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface RouteStatusChipProps {
  title: string;
  visitedCount: number;
  totalCount: number;
  onPress: () => void;
  onClose: () => void;
}

export function RouteStatusChip({
  title,
  visitedCount,
  totalCount,
  onPress,
  onClose,
}: RouteStatusChipProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.chip, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        onPress={onPress}
      >
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {t('map.routeOnMap', { name: title })}
        </Text>

        <Text style={[styles.count, { color: colors.textMuted }]}>
          {formatNumber(visitedCount)}/{formatNumber(totalCount)}
        </Text>

        <Pressable hitSlop={12} onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={16} color={colors.text} />
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
  },
  count: {
    fontSize: 13,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 2,
  },
});