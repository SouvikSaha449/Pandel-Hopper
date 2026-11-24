import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';
import type { SavedTabType } from './SavedSegmentTabs';

interface SavedEmptyStateProps {
  type?: SavedTabType;
}

export function SavedEmptyState({ type = 'pujas' }: SavedEmptyStateProps) {
  const colors = useTheme();
  const { t } = useTranslation();

  const isRoutes = type === 'routes';

  const handleAction = () => {
    if (isRoutes) {
      router.navigate('/(tabs)/routes');
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>

      <View style={[styles.iconCircle, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Ionicons
          name={isRoutes ? 'map-outline' : 'heart-outline'}
          size={48}
          color={colors.accent}
        />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        {isRoutes ? t('saved.emptyRoutesTitle') : t('saved.emptyTitle')}
      </Text>

      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {isRoutes ? t('saved.emptyRoutesBody') : t('saved.emptyBody')}
      </Text>


      <Pressable
        accessibilityRole="button"
        onPress={handleAction}
        style={({ pressed }) => [
          styles.actionBtn,
          { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Ionicons
          name={isRoutes ? 'compass-outline' : 'map'}
          size={20}
          color="#171325"
        />
        <Text style={styles.actionBtnText}>
          {isRoutes ? t('saved.exploreRoutes') : t('saved.explore')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
    gap: 14,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  actionBtn: {
    marginTop: 12,
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  actionBtnText: {
    color: '#171325',
    fontSize: 15,
    fontWeight: '800',
  },
});