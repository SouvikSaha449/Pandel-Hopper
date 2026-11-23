import { useState } from 'react';
import { FlatList, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNumber, useTranslation } from '@/i18n';
import { useTheme } from '@/hooks/use-theme';
import { useRoutesStore } from '@/store/routes';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { RoutesEmptyState } from './RoutesEmptyState';
import { HistoryCard } from './HistoryCard';

export function HistoryTab() {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  const history = useRoutesStore((s) => s.history);
  const startRoute = useRoutesStore((s) => s.startRoute);
  const deleteHistoryEntry = useRoutesStore((s) => s.deleteHistoryEntry);

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const totalPujas = history.reduce((sum, h) => sum + h.stopsCount, 0);
  const totalKm = history.reduce((sum, h) => sum + h.km, 0);

  const handleExport = async () => {
    if (history.length === 0) return;
    try {
      const backupData = JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          totalWalks: history.length,
          history,
        },
        null,
        2
      );
      await Share.share({
        message: backupData,
        title: 'Pandal Hopping History Backup',
      });
    } catch {
      // Ignored if user dismisses share sheet
    }
  };

  const handleWalkAgain = (routeId: string) => {
    startRoute(routeId);
    router.navigate('/(tabs)');
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteHistoryEntry(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            {/* 3-Column Stats Card */}
            <View
              style={[
                styles.statsCard,
                { backgroundColor: colors.card, borderColor: colors.cardBorder },
              ]}
            >
              <View style={styles.statCol}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {formatNumber(totalPujas)}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  {t('history.pujasVisited')}
                </Text>
              </View>

              <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />

              <View style={styles.statCol}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {formatNumber(history.length)}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  {t('history.routesDone')}
                </Text>
              </View>

              <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />

              <View style={styles.statCol}>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {formatNumber(totalKm.toFixed(1))}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  {t('history.walked')}
                </Text>
              </View>
            </View>

            {/* Section Header: Title & Export Button */}
            {history.length > 0 && (
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                  {t('history.title')}
                </Text>
                <Pressable
                  style={[
                    styles.exportBtn,
                    { backgroundColor: colors.card, borderColor: colors.cardBorder },
                  ]}
                  onPress={handleExport}
                >
                  <Ionicons name="share-outline" size={14} color={colors.accent} />
                  <Text style={[styles.exportText, { color: colors.text }]}>
                    {t('history.export')}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <RoutesEmptyState
            icon="footsteps-outline"
            title={t('history.emptyTitle')}
            subtitle={t('history.emptySubtitle')}
          />
        }
        renderItem={({ item }) => (
          <HistoryCard
            item={item}
            onPress={() => router.push({ pathname: '/route/[id]', params: { id: item.routeId } })}
            onWalkAgain={() => handleWalkAgain(item.routeId)}
            onDelete={() => setDeleteTargetId(item.id)}
          />
        )}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteTargetId !== null}
        title={t('history.deleteConfirm')}
        message={t('common.confirmAgain')}
        cancelLabel={t('common.cancel')}
        confirmLabel={t('common.done')}
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
      />
    </>
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
    gap: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  exportText: {
    fontSize: 12,
    fontWeight: '600',
  },
});