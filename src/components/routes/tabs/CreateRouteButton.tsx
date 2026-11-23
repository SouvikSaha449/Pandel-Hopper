import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';

interface CreateRouteButtonProps {
  onPress?: () => void;
}

export function CreateRouteButton({ onPress }: CreateRouteButtonProps) {
  const colors = useTheme();
  const isDark = useColorScheme() === 'dark';
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.createBtn,
        {
          borderColor: colors.accent,
          backgroundColor: colors.accentBg,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Ionicons name="add" size={22} color={isDark ? colors.text : colors.accent} />
      <Text style={[styles.createText, { color: isDark ? colors.text : colors.accent }]}>
        {t('routes.createOwn')}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  createBtn: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createText: {
    fontSize: 16,
    fontWeight: '700',
  },
});