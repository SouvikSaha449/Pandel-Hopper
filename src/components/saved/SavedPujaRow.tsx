
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { GradientTile } from '@/components/routes/tabs/GradientTile';
import type { Puja } from '@/data/pujas';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';

interface SavedPujaRowProps {
  puja: Puja;
  onToggleFavourite: (id: string) => void;
  showDivider?: boolean;
}

export function SavedPujaRow({
  puja,
  onToggleFavourite,
  showDivider = true,
}: SavedPujaRowProps) {
  const colors = useTheme();
  const lang = usePrefs((s) => s.lang);
  const { t } = useTranslation();
  const formatNumber = useNumber();

  const title = puja.name[lang] || puja.name.en;

  const areaFormatted =
    puja.area.charAt(0).toUpperCase() + puja.area.slice(1);
  const walkInfo = puja.metro
    ? `${t('common.minWalk', { n: formatNumber(puja.metro.walkMin) })}`
    : '';
  const subtitle = walkInfo ? `${areaFormatted} · ${walkInfo}` : areaFormatted;

  const handleRowPress = () => {
    router.push({ pathname: '/puja/[id]', params: { id: puja.id } } as any);
  };

  return (
    <View style={[styles.wrap, showDivider && { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}>
      <Pressable
        accessibilityRole="button"
        onPress={handleRowPress}
        style={({ pressed }) => [styles.row, { opacity: pressed ? 0.75 : 1 }]}
      >

        <GradientTile size={46} radius={12} />

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Remove from favourites"
          onPress={() => onToggleFavourite(puja.id)}
          hitSlop={12}
          style={({ pressed }) => [styles.heartBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons name="heart" size={22} color="#E5534B" />
        </Pressable>
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
    paddingVertical: 12,
    gap: 14,
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
  heartBtn: {
    padding: 6,
  },
});