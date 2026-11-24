import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';

export type SavedTabType = 'pujas' | 'routes';

interface SavedSegmentTabsProps {
  activeTab: SavedTabType;
  onSelect: (tab: SavedTabType) => void;
  pujasCount: number;
  routesCount: number;
}

export function SavedSegmentTabs({
  activeTab,
  onSelect,
  pujasCount,
  routesCount,
}: SavedSegmentTabsProps) {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'pujas' }}
        onPress={() => onSelect('pujas')}
        style={({ pressed }) => [
          styles.tab,
          activeTab === 'pujas'
            ? [styles.tabActive, { backgroundColor: colors.accent }]
            : [styles.tabInactive, { backgroundColor: colors.card, borderColor: colors.cardBorder }],
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text
          style={[
            styles.tabText,
            { color: activeTab === 'pujas' ? '#171325' : colors.text },
          ]}
        >
          {t('saved.pujas')}
          {pujasCount > 0 ? ` (${pujasCount})` : ''}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'routes' }}
        onPress={() => onSelect('routes')}
        style={({ pressed }) => [
          styles.tab,
          activeTab === 'routes'
            ? [styles.tabActive, { backgroundColor: colors.accent }]
            : [styles.tabInactive, { backgroundColor: colors.card, borderColor: colors.cardBorder }],
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text
          style={[
            styles.tabText,
            { color: activeTab === 'routes' ? '#171325' : colors.text },
          ]}
        >
          {t('saved.routes')}
          {routesCount > 0 ? ` (${routesCount})` : ''}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  tabInactive: {
    borderWidth: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
});