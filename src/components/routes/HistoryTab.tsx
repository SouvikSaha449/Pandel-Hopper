import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { useRoutesStore } from '@/store/routes';
import { RoutesEmptyState } from './RoutesEmptyState';

export function HistoryTab() {
  const colors = useTheme();
  const { t } = useTranslation();

  const history = useRoutesStore((s) => s.history);
  const totalPujas = history.reduce((sum, h) => sum + h.stopsCount, 0);
  const totalKm = history.reduce((sum, h) => sum + h.km, 0);

  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <View
            style={[
              styles.statsCard,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
          >
            <View style={styles.statCol}>
              <Text style={[styles.statValue, { color: colors.text }]}>{totalPujas}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {t('history.pujasVisited')}
              </Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />

            <View style={styles.statCol}>
              <Text style={[styles.statValue, { color: colors.text }]}>{history.length}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {t('history.routesDone')}
              </Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />

            <View style={styles.statCol}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {totalKm.toFixed(1)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {t('history.walked')}
              </Text>
            </View>
          </View>

          {history.length > 0 ? (
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              {t('history.title')}
            </Text>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        <RoutesEmptyState
          icon="footsteps-outline"
          title="No completed walks yet"
          subtitle="Complete a route to log your pandal hopping stats here."
        />
      }
      renderItem={({ item }) => (
        <View
          style={[
            styles.historyCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <View style={styles.historyTop}>
            <Text style={[styles.historyTitle, { color: colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.historyDate, { color: colors.textMuted }]}>
              {new Date(item.finishedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
          <Text style={[styles.historyMeta, { color: colors.textMuted }]}>
            {t('common.pujas', { count: item.stopsCount })} · {item.km.toFixed(1)} km ·{' '}
            {item.minutes} min
          </Text>
        </View>
      )}
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
  statsCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  historyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  historyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  historyMeta: {
    fontSize: 13,
  },
});