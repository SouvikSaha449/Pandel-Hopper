import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface StopOrderItemProps {
  index: number;
  pujaName: string;
  subtitle?: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

export function StopOrderItem({
  index,
  pujaName,
  subtitle,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}: StopOrderItemProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();
  const formattedIndex = formatNumber(index + 1);
  const displayIndex = index < 9 ? `0${formattedIndex}` : formattedIndex;

  return (
    <View
      style={[
        styles.row,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      <View style={[styles.badge, { backgroundColor: colors.accentBg, borderColor: colors.accent }]}>
        <Text style={[styles.badgeText, { color: colors.accent }]}>
          {displayIndex}
        </Text>
      </View>

      <View style={styles.nameBlock}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {pujaName}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.textMuted }]} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityLabel="Move up"
          disabled={isFirst}
          onPress={onMoveUp}
          style={({ pressed }) => [
            styles.actionTile,
            {
              backgroundColor: colors.bg,
              borderColor: colors.cardBorder,
              opacity: isFirst ? 0.25 : pressed ? 0.7 : 1,
            },
          ]}
        >
          <Ionicons name="chevron-up" size={16} color={colors.text} />
        </Pressable>

        <Pressable
          accessibilityLabel="Move down"
          disabled={isLast}
          onPress={onMoveDown}
          style={({ pressed }) => [
            styles.actionTile,
            {
              backgroundColor: colors.bg,
              borderColor: colors.cardBorder,
              opacity: isLast ? 0.25 : pressed ? 0.7 : 1,
            },
          ]}
        >
          <Ionicons name="chevron-down" size={16} color={colors.text} />
        </Pressable>

        <Pressable
          accessibilityLabel={t('common.close')}
          onPress={onRemove}
          style={({ pressed }) => [
            styles.actionTile,
            {
              backgroundColor: colors.bg,
              borderColor: colors.cardBorder,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Ionicons name="close" size={16} color={colors.accent} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  nameBlock: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionTile: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});