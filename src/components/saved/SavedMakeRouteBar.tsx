import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';

interface SavedMakeRouteBarProps {
  onMakeRoute: () => void;
  onClearAll: () => void;
  disabled?: boolean;
}

export function SavedMakeRouteBar({
  onMakeRoute,
  onClearAll,
  disabled = false,
}: SavedMakeRouteBarProps) {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, borderTopColor: colors.cardBorder }]}>

      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onMakeRoute}
        style={({ pressed }) => [
          styles.makeRouteBtn,
          {
            backgroundColor: disabled ? colors.card : colors.accent,
            opacity: pressed ? 0.85 : disabled ? 0.6 : 1,
          },
        ]}
      >
        <Ionicons
          name="git-branch-outline"
          size={20}
          color={disabled ? colors.textMuted : '#171325'}
        />
        <Text
          style={[
            styles.makeRouteBtnText,
            { color: disabled ? colors.textMuted : '#171325' },
          ]}
        >
          {t('saved.makeRoute')}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onClearAll}
        hitSlop={8}
        style={({ pressed }) => [styles.clearBtn, { opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={[styles.clearBtnText, { color: colors.textMuted }]}>
          {t('saved.clearAll')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  makeRouteBtn: {
    alignSelf: 'stretch',
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  makeRouteBtnText: {
    fontSize: 16,
    fontWeight: '800',
  },
  clearBtn: {
    paddingVertical: 4,
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
});