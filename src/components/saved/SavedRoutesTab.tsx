
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { readyRoutes } from '@/data/routes';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import type { Lang } from '@/store/prefs';
import type { CustomRoute } from '@/types/routes';
import { SavedEmptyState } from './SavedEmptyState';
import { SavedRouteRow } from './SavedRouteRow';

interface SavedRoutesTabProps {
  savedRoutes: string[];
  customRoutes: CustomRoute[];
  lang: Lang;
}

export function SavedRoutesTab({
  savedRoutes,
  customRoutes,
  lang,
}: SavedRoutesTabProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  const totalCount = savedRoutes.length + customRoutes.length;

  if (totalCount === 0) {
    return <SavedEmptyState type="routes" />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
          {t('saved.routesCount', { count: formatNumber(totalCount) })}
        </Text>
      </View>

      <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>

        {savedRoutes.map((routeId, index) => {
          const route = readyRoutes.find((r) => r.id === routeId);
          if (!route) return null;
          const isLast =
            customRoutes.length === 0 && index === savedRoutes.length - 1;
          return (
            <SavedRouteRow
              key={route.id}
              id={route.id}
              title={route.name[lang] || route.name.en}
              stopsCount={route.stops.length}
              isCustom={false}
              showDivider={!isLast}
            />
          );
        })}

        {customRoutes.map((route, index) => {
          const isLast = index === customRoutes.length - 1;
          return (
            <SavedRouteRow
              key={route.id}
              id={route.id}
              title={route.name}
              stopsCount={route.stops.length}
              isCustom={true}
              showDivider={!isLast}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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