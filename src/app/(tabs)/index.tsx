import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useRoutesStore } from '@/store/routes';
import { useRouteTracker } from '@/hooks/use-route-tracker';
import { AreaFilterChips } from '@/components/map/AreaFilterChips';
import { MapSearchBar } from '@/components/map/MapSearchBar';
import { LanguageChip } from '@/components/map/LanguageChip';
import { RouteStatusChip } from '@/components/map/RouteStatusChip';
import { RouteLiveHud } from '@/components/map/RouteLiveHud';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function MapScreen() {
  const colors = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const active = useRoutesStore((s) => s.active);
  const tracker = useRouteTracker(active?.routeId);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>

      <View style={styles.header}>
        {active && tracker.route ? (
         
          <RouteStatusChip
            title={tracker.route.title}
            visitedCount={tracker.visitedCount}
            totalCount={tracker.route.stops.length}
            onPress={() => router.push(`/route/${tracker.route?.id}`)}
            onClose={tracker.handleEndHop}
          />
        ) : (

          <>
            <View style={styles.searchWrapper}>
              <MapSearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                right={<LanguageChip />}
              />
            </View>
            <AreaFilterChips selectedArea={selectedArea} onSelectArea={setSelectedArea} />
          </>
        )}
      </View>

      <View style={styles.mapArea} />

      
      {active && tracker.route && tracker.nextPuja && (
        <View style={styles.hudWrapper}>
          <RouteLiveHud
            totalStops={tracker.route.stops.length}
            visitedCount={tracker.visitedCount}
            nextStopIndex={tracker.visitedCount}
            nextPuja={tracker.nextPuja}
            walkMinutes={4}
            onArrive={() => tracker.nextPuja && tracker.handleArrive(tracker.nextPuja.id)}
            onOpenRoute={() => router.push(`/route/${tracker.route?.id}`)}
            onGoNext={() => {
              if (tracker.nextPuja) {
                tracker.handleArrive(tracker.nextPuja.id);
              }
            }}
          />
        </View>
      )}

      <ConfirmDialog
        visible={tracker.isEndHopOpen}
        title={tracker.t('routes.endHopTitle')}
        message={tracker.t('routes.endHopBody')}
        cancelLabel={tracker.t('common.cancel')}
        confirmLabel={tracker.t('routes.finishRoute')}
        onCancel={tracker.closeEndHopDialog}
        onConfirm={tracker.confirmFinishHop}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        paddingTop: 12,
    },
    searchWrapper: {
        paddingHorizontal: 16,
    },
    mapArea: {
        flex: 1,
    },
    hudWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
});