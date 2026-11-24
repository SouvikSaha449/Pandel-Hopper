import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Puja } from '@/data/pujas';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import { SavedEmptyState } from './SavedEmptyState';
import { SavedMakeRouteBar } from './SavedMakeRouteBar';
import { SavedPujaRow } from './SavedPujaRow';

interface SavedPujasTabProps {
  pujas: Puja[];
  onToggleFavourite: (id: string) => void;
  onMakeRoute: () => void;
  onRequestClearAll: () => void;
}

export function SavedPujasTab({
  pujas,
  onToggleFavourite,
  onMakeRoute,
  onRequestClearAll,
}: SavedPujasTabProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  if (pujas.length === 0) {
    return <SavedEmptyState type="pujas" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            {t('saved.wantToVisit', { count: formatNumber(pujas.length) })}
          </Text>
        </View>

        <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {pujas.map((puja, index) => (
            <SavedPujaRow
              key={puja.id}
              puja={puja}
              onToggleFavourite={onToggleFavourite}
              showDivider={index < pujas.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      <SavedMakeRouteBar
        onMakeRoute={onMakeRoute}
        onClearAll={onRequestClearAll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  listCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
});