import { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';
import {
  computeRouteMetrics,
  optimizeStopOrder,
  resolveRouteById,
  useRoutesStore,
} from '@/store/routes';
import { getNearestTransit } from '@/utils/route-transit';

export function useRouteEditor() {

  const { from, edit, add, fav } = useLocalSearchParams<{
    from?: string;
    edit?: string;
    add?: string;
    fav?: string;
  }>();

  const colors = useTheme();
  const { t } = useTranslation();
  const lang = usePrefs((s) => s.lang);
  const favourites = usePrefs((s) => s.favourites);
  const customRoutes = useRoutesStore((s) => s.customRoutes);
  const saveCustomRoute = useRoutesStore((s) => s.saveCustomRoute);
  const startRoute = useRoutesStore((s) => s.startRoute);

  const sourceRoute = useMemo(() => {
    const targetId = edit ?? from;
    if (!targetId) return null;
    return resolveRouteById(targetId, customRoutes, lang);
  }, [edit, from, customRoutes, lang]);

  const [name, setName] = useState(() => {
    if (fav === '1') return t('saved.defaultSavedRouteName');
    return sourceRoute?.title ?? '';
  });

  const [stops, setStops] = useState<string[]>(() => {
    if (fav === '1') {
      return [...favourites];
    }
    const base = sourceRoute ? [...sourceRoute.stops] : [];
    if (add && !base.includes(add)) {
      return [...base, add];
    }
    return base;
  });

  const [lockStart, setLockStart] = useState(false);
  const [lockEnd, setLockEnd] = useState(false);

  const [optimizeResult, setOptimizeResult] = useState<{
    title: string;
    message: string;
    previousStops?: string[];
  } | null>(null);

  const optimize = () => {
    if (stops.length <= 2) return;
    const previousStops = [...stops];
    const optimized = optimizeStopOrder(stops);
    const isSameOrder = stops.every((id, idx) => id === optimized[idx]);

    if (isSameOrder) {
      setOptimizeResult({
        title: t('routes.optimize'),
        message: t('routes.optimizeAlreadyShortest'),
      });
      return;
    }

    const prevKm = metrics.km;
    const newMetrics = computeRouteMetrics(optimized);
    const savedKm = Math.max(0, Number((prevKm - newMetrics.km).toFixed(1)));

    setStops(optimized);
    setOptimizeResult({
      title: t('routes.optimize'),
      message:
        savedKm > 0
          ? t('routes.optimizeSavedKm', { km: savedKm })
          : t('routes.optimizeShortestPath'),
      previousStops,
    });
  }; 

  const undoOptimize = () => {
    if (optimizeResult?.previousStops) {
      setStops(optimizeResult.previousStops);
    }
    setOptimizeResult(null);
  };

  const dismissOptimizeResult = () => setOptimizeResult(null);

  const firstTransit = useMemo(
    () => (stops.length > 0 ? getNearestTransit(stops[0]) : null),
    [stops]
  );
  const lastTransit = useMemo(
    () => (stops.length > 1 ? getNearestTransit(stops[stops.length - 1]) : null),
    [stops]
  );

  const metrics = useMemo(() => computeRouteMetrics(stops), [stops]);

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setStops((prev) => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index >= stops.length - 1) return;
    setStops((prev) => {
      const copy = [...prev];
      [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
      return copy;
    });
  };

  const setAsStart = (index: number) => {
    if (index === 0) return;
    setStops((prev) => {
      const target = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      return [target, ...remaining];
    });
  };

  const setAsEnd = (index: number) => {
    if (index === stops.length - 1) return;
    setStops((prev) => {
      const target = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      return [...remaining, target];
    });
  };

  const removeStop = (index: number) => {
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const addStop = (pujaId: string) => {
    setStops((prev) => (prev.includes(pujaId) ? prev : [...prev, pujaId]));
  };

  const toggleLockStart = () => setLockStart((prev) => !prev);
  const toggleLockEnd = () => setLockEnd((prev) => !prev);

  const save = (status: 'draft' | 'active') => {
    const routeName = name.trim() || t('routes.newRoute');
    const savedId = saveCustomRoute(routeName, stops, edit);
    if (status === 'active') {
      startRoute(savedId);
      router.replace({
        pathname: '/route/[id]',
        params: { id: savedId },
      });
    } else {
      router.back();
    }
  };

  return {
    name,
    setName,
    stops,
    metrics,
    lockStart,
    lockEnd,
    toggleLockStart,
    toggleLockEnd,
    firstTransit,
    lastTransit,
    moveUp,
    moveDown,
    setAsStart,
    setAsEnd,
    removeStop,
    addStop,
    optimize,
    optimizeResult,
    undoOptimize,
    dismissOptimizeResult,
    save,
    isEditing: Boolean(edit),
    colors,
    t,
  };
}