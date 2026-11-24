
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface SavedRouteRowProps {
  id: string;
  title: string;
  stopsCount: number;
  isCustom?: boolean;
  showDivider?: boolean;
}

export function SavedRouteRow({
  id,
  title,
  stopsCount,
  isCustom = false,
  showDivider = true,
}: SavedRouteRowProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  const handlePress = () => {
    router.push({ pathname: '/route/[id]', params: { id } });
  };

  const subtitle = isCustom
    ? t('saved.createdByYou', { count: formatNumber(stopsCount) })
    : t('common.pujas', { count: formatNumber(stopsCount) });

  return (
    <View style={[styles.wrap, showDivider && { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}>
      <Pressable
        accessibilityRole="button"
        onPress={handlePress}
        style={({ pressed }) => [styles.row, { opacity: pressed ? 0.75 : 1 }]}
      >

        <View style={[styles.iconBadge, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Ionicons
            name={isCustom ? 'compass-outline' : 'map-outline'}
            size={22}
            color={colors.accent}
          />
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
  },
});