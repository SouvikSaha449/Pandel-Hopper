import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { computeRouteMetrics, useRoutesStore } from '@/store/routes';
import { CreateRouteButton } from './CreateRouteButton';
import { RouteCard } from './RouteCard';
import { RoutesEmptyState } from './RoutesEmptyState';
import { router } from 'expo-router';

export function CustomRoutesTab() {
  const colors = useTheme();
  const { t } = useTranslation();

  const customRoutes = useRoutesStore((s) => s.customRoutes);
  const startRoute = useRoutesStore((s) => s.startRoute);

  return (
    <FlatList
      data={customRoutes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <CreateRouteButton onPress={() => router.push('/route/new')} />

          {customRoutes.length > 0 ? (
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              {t('routes.yourRoutes')}
            </Text>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        <RoutesEmptyState
          icon="map-outline"
          title={t('saved.emptyTitle')}
          subtitle={t('routes.emptyCustomSubtitle')}
        />
      }
      renderItem={({ item }) => {
        const metrics = computeRouteMetrics(item.stops);
        return (
          <RouteCard
            title={item.name}
            subtitle={t('routes.draft', { count: item.stops.length })}
            stopsCount={item.stops.length}
            minutes={metrics.totalMinutes}
            onPress={() =>
              router.push({
                pathname: '/route/[id]',
                params: { id: item.id },
              })
            }
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 32,
    gap: 12,
  },
  listHeader: {
    gap: 20,
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});