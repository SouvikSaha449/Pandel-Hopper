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
import { Alert } from 'react-native';

export function useRouteEditor() {
    const { from, edit, add } = useLocalSearchParams<{
        from?: string;
        edit?: string;
        add?: string
    }>()

    const colors = useTheme();
    const { t } = useTranslation();
    const lang = usePrefs((s) => s.lang);
    const customRoutes = useRoutesStore((s) => s.customRoutes);
    const saveCustomRoute = useRoutesStore((s) => s.saveCustomRoute);
    const startRoute = useRoutesStore((s) => s.startRoute);

    const sourceRoute = useMemo(() => {
        const targetId = edit ?? from;
        if (!targetId) return null
        return resolveRouteById(targetId, customRoutes, lang)
    }, [edit, from, customRoutes, lang])

    const [name, setName] = useState(() => sourceRoute?.title ?? '')
    const [stops, setStops] = useState<string[]>(() => {
        const base = sourceRoute ? [...sourceRoute.stops] : [];
        if (add && !base.includes(add)) {
            return [...base, add];
        }
        return base;
    })

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

  const removeStop = (index: number) => {
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const addStop = (pujaId: string) => {
    setStops((prev) => (prev.includes(pujaId) ? prev : [...prev, pujaId]));
  };

    const optimize = () => {
    if (stops.length <= 2) return;
    const optimized = optimizeStopOrder(stops);
    const isSameOrder = stops.every((id, idx) => id === optimized[idx]);

    if (isSameOrder) {
      Alert.alert(
        t('routes.optimize'),
        'Your route is already arranged in the shortest possible walking order!'
      );
      return;
    }

    const prevKm = metrics.km;
    const newMetrics = computeRouteMetrics(optimized);
    const savedKm = Math.max(0, Number((prevKm - newMetrics.km).toFixed(1)));

    setStops(optimized);
    Alert.alert(
      t('routes.optimize'),
      savedKm > 0
        ? `Reordered stops for shortest walk! Saved ~${savedKm} km of walking.`
        : 'Reordered stops for the shortest walking path!'
    );
  };

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
    moveUp,
    moveDown,
    removeStop,
    addStop,
    optimize,
    save,
    isEditing: Boolean(edit),
    colors,
    t,
  };
}