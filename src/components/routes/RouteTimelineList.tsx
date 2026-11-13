
import { FlatList, StyleSheet, Text } from 'react-native';
import { walkMinutes } from '@/data/geo';
import { getPuja, pujaName } from '@/data/pujas';
import type { useRouteTracker } from '@/hooks/use-route-tracker';
import { NextStopCard } from './NextStopCard';
import { RouteSummaryHeader } from './RouteSummaryHeader';
import { StopTimelineItem } from './StopTimeLineItem';

interface RouteTimelineListProps {
  tracker: ReturnType<typeof useRouteTracker>;
}

export function RouteTimelineList({ tracker }: RouteTimelineListProps) {
  const {
    route,
    metrics,
    isActive,
    visitedMap,
    visitedCount,
    nextPuja,
    handleArrive,
    unmarkVisited,
    lang,
    colors,
    t,
  } = tracker;

  if (!route) return null;

  return (
    <FlatList
      data={route.stops}
      keyExtractor={(stopId) => stopId}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          <RouteSummaryHeader
            title={route.title}
            subtitle={route.subtitle}
            stopsCount={route.stops.length}
            totalMinutes={metrics.totalMinutes}
            km={metrics.km}
          />

          {isActive && nextPuja ? (
            <NextStopCard
              pujaName={pujaName(nextPuja, lang)}
              visitedCount={visitedCount}
              totalStops={route.stops.length}
              onArrive={() => handleArrive(nextPuja.id)}
            />
          ) : null}

          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            {t('complete.yourStops').toUpperCase()}
          </Text>
        </>
      }
      renderItem={({ item: stopId, index }) => {
        const puja = getPuja(stopId);
        if (!puja) return null;

        const isVisited = Boolean(visitedMap[stopId]);
        const isNext = isActive && stopId === nextPuja?.id;
        const prevPuja = index > 0 ? getPuja(route.stops[index - 1]) : null;
        const walkBetween =
          prevPuja?.loc && puja.loc ? walkMinutes(prevPuja.loc, puja.loc) : null;
        const metroInfo = puja.metro
          ? `${puja.metro.name} · ${t('common.minWalk', { n: puja.metro.walkMin })}`
          : undefined;

        return (
          <StopTimelineItem
            index={index}
            isLast={index === route.stops.length - 1}
            isVisited={isVisited}
            isNext={isNext}
            isActive={isActive}
            pujaName={pujaName(puja, lang)}
            metroInfo={metroInfo}
            walkFromPrev={walkBetween}
            onToggleVisited={() =>
              isVisited ? unmarkVisited(stopId) : handleArrive(stopId)
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
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 8,
  },
});