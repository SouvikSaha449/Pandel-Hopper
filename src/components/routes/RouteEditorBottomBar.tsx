import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';

interface RouteEditorBottomBarProps {
  hasStops: boolean;
  onDone: () => void;
  onStartRoute: () => void;
}

export function RouteEditorBottomBar({
  hasStops,
  onDone,
  onStartRoute,
}: RouteEditorBottomBarProps) {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.bottomBar,
        { backgroundColor: colors.card, borderTopColor: colors.cardBorder },
      ]}
    >
      <View style={styles.bottomButtonsRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onDone}
          style={({ pressed }) => [
            styles.secondaryBtn,
            { borderColor: colors.cardBorder, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.text }]}>
            {t('common.done')}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          disabled={!hasStops}
          onPress={onStartRoute}
          style={({ pressed }) => [
            styles.primaryBtn,
            {
              backgroundColor: colors.accent,
              opacity: !hasStops ? 0.4 : pressed ? 0.85 : 1,
            },
          ]}
        >
          <Ionicons name="play" size={18} color="#FFFFFF" />
          <Text style={styles.primaryBtnText}>{t('routes.startRoute')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
});