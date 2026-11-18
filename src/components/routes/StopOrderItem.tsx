import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface StopOrderItemProps {
  index: number;
  pujaName: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

export function StopOrderItem({
  index,
  pujaName,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}: StopOrderItemProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >

      <View style={[styles.badge, { backgroundColor: colors.accent }]}>
        <Text style={styles.badgeText}>
          {formatNumber(index + 1)}
        </Text>
      </View>

      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
        {pujaName}
      </Text>

      <View style={styles.controlsRow}>
        <Pressable
          accessibilityLabel={t('common.close')}
          accessibilityRole="button"
          onPress={onRemove}
          hitSlop={8}
          style={({ pressed }) => [
            styles.iconBtn,
            { opacity: pressed ? 0.5 : 0.75 },
          ]}
        >
          <Ionicons name="close" size={18} color={colors.textMuted} />
        </Pressable>

        <Pressable
          accessibilityLabel="Reorder"
          accessibilityRole="button"
          onPress={isLast ? onMoveUp : onMoveDown}
          onLongPress={onMoveUp}
          hitSlop={8}
          style={({ pressed }) => [
            styles.iconBtn,
            { opacity: pressed ? 0.5 : 0.75 },
          ]}
        >
          <Ionicons name="reorder-two-outline" size={20} color={colors.textMuted} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#171325',
    fontSize: 15,
    fontWeight: '800',
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBtn: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});