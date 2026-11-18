import { distanceKm, walkMinutes } from '@/data/geo';
import { getPuja } from '@/data/pujas';
import { readyRoutes } from '@/data/routes';
import type { Lang } from '@/store/prefs';
import type { CustomRoute, ResolvedRoute, RouteMetrics } from '@/types/routes';

const STOP_DWELL_MINUTES = 30;
const STREET_DETOUR_FACTOR = 1.3;

export function computeRouteMetrics(stops: string[]): RouteMetrics {
  let rawKm = 0;
  let walk = 0;

  for (let i = 0; i < stops.length - 1; i++) {
    const from = getPuja(stops[i]);
    const to = getPuja(stops[i + 1]);
    if (!from || !to) continue;
    rawKm += distanceKm(from.loc, to.loc) * STREET_DETOUR_FACTOR;
    walk += walkMinutes(from.loc, to.loc);
  }

  return {
    km: Number(rawKm.toFixed(1)),
    walkMinutes: walk,
    totalMinutes: walk + stops.length * STOP_DWELL_MINUTES,
  };
}

export function resolveRouteById(
  routeId: string,
  customRoutes: CustomRoute[],
  lang: Lang
): ResolvedRoute | null {
  const ready = readyRoutes.find((r) => r.id === routeId);
  if (ready) {
    return {
      id: ready.id,
      title: ready.name[lang],
      subtitle: ready.sub[lang],
      stops: ready.stops,
      minutes: ready.minutes,
      isCustom: false,
      ready,
    };
  }

  const custom = customRoutes.find((r) => r.id === routeId);
  if (!custom) return null;

  const { totalMinutes } = computeRouteMetrics(custom.stops);
  return {
    id: custom.id,
    title: custom.name,
    stops: custom.stops,
    minutes: totalMinutes,
    isCustom: true,
  };
}