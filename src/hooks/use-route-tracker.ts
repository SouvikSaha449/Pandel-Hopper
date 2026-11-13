import { useMemo } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { getPuja } from '@/data/pujas';
import { usePrefs } from '@/store/prefs';
import {
  computeRouteMetrics,
  resolveRouteById,
  useRoutesStore,
} from '@/store/routes';

export function useRouteTracker(id?: string) {
  const colors = useTheme();
  const { t } = useTranslation();
  const lang = usePrefs((s) => s.lang);

  const customRoutes = useRoutesStore((s) => s.customRoutes);
  const active = useRoutesStore((s) => s.active);
  const startRoute = useRoutesStore((s) => s.startRoute);
  const markVisited = useRoutesStore((s) => s.markVisited);
  const unmarkVisited = useRoutesStore((s) => s.unmarkVisited);
  const clearActive = useRoutesStore((s) => s.clearActive);
  const completeActiveRoute = useRoutesStore((s) => s.completeActiveRoute);

  const route = resolveRouteById(id ?? '', customRoutes, lang);

  const metrics = useMemo(
    () => (route ? computeRouteMetrics(route.stops) : { km: 0, totalMinutes: 0 }),
    [route]
  );

  const isActive = active?.routeId === route?.id;
  const visitedMap = active && isActive ? active.visitedAt : {};
  const visitedCount = route
    ? route.stops.filter((stopId) => Boolean(visitedMap[stopId])).length
    : 0;
  const isComplete = Boolean(route && visitedCount === route.stops.length);

  const nextStopId =
    isActive && route ? route.stops.find((stopId) => !visitedMap[stopId]) : null;
  const nextPuja = nextStopId ? getPuja(nextStopId) : null;

   const handleStart = () => {
    if (route) startRoute(route.id);
  };

  const handleArrive = (pujaId: string) => {
    if (!route) return;
    markVisited(pujaId);
     if (visitedCount + 1 === route.stops.length) {
      Alert.alert(
        t('complete.title'),
        `${route.title} - ${visitedCount + 1}/${route.stops.length} ${t('history.pujasVisited')}`,
        [
          {
            text: t('common.done'),
            onPress: () => {
              completeActiveRoute(route.title, route.stops);
              router.back();
            },
          },
        ]
      );
    }
  };
   const handleEndHop = () => {
    if (!route) return;
    Alert.alert(
      t('routes.endHopTitle'),
      t('routes.endHopBody'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('routes.finishRoute'),
          onPress: () => {
            completeActiveRoute(route.title, route.stops);
            router.back();
          },
        },
        {
          text: t('routes.pauseAndExit'),
          style: 'destructive',
          onPress: () => clearActive(),
        },
      ]
    );
  };

   return {
    route,
    metrics,
    isActive,
    isComplete,
    visitedMap,
    visitedCount,
    nextPuja,
    handleStart,
    handleArrive,
    handleEndHop,
    unmarkVisited,
    lang,
    colors,
    t,
  };
}