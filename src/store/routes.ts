import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import { distanceKm, walkMinutes } from "@/data/geo";
import { getPuja } from "@/data/pujas";
import { readyRoutes, type ReadyRoute } from "@/data/routes";
import type { Lang } from "./prefs";

export type CustomRoute = {
  id: string,
  name: string,
  stops: string[],
  updatedAt: number;
}

export type ActiveHop = {
  routeId: string;
  visitedAt: Record<string,number>;
  startedAt: number;
}

export type CompletedHop = {
  id: string;
  routeId: string;
  title: string;
  stopsCount: number;
  km: number;
  minutes: number;
  finishedAt: number;
}

export type RouteMetrics = {
  km: number,
  walkMinutes: number,
  totalMinutes: number,
}

const STOP_DWELL_MINUTES = 30
const STREET_DETOUR_FACTOR = 1.3

export function computeRouteMetrics(stops: string[]): RouteMetrics{
  let rawKm = 0;
  let walk = 0;

  for (let i = 0;i<stops.length-1; i++){
    const from = getPuja(stops[i])
    const to = getPuja(stops[i+1])
    if (!from || !to) continue;
    rawKm += distanceKm(from.loc, to.loc) * STREET_DETOUR_FACTOR;
    walk += walkMinutes(from.loc, to.loc);
  }

  return {
    km: Number(rawKm.toFixed(1)),
    walkMinutes: walk,
    totalMinutes: walk + stops.length * STOP_DWELL_MINUTES,
  }
}

export function optimizeStopOrder(stops: string[]): string[]{
  if(stops.length <= 2){
    return [...stops]
  }

  const ordered: string[] = [stops[0]]
  const remaining = new Set(stops.slice(1))

  while(remaining.size > 0){
    const current = getPuja(ordered[ordered.length - 1])
    let bestId: string | null = null
    let bestDist = Infinity;

    for(const candidateId of remaining){
      const candidate = getPuja(candidateId);
      const d = current && candidate ? distanceKm(current.loc, candidate.loc): Infinity

      if(d< bestDist){
        bestDist = d;
        bestId = candidateId;
      }
    }

    const nextId = bestId ?? remaining.values().next().value!;
    ordered.push(nextId);
    remaining.delete(nextId)
  }

  return ordered;
}

export type ResolvedRoute = {
  id: string;
  title: string;
  subtitle?: string;
  stops: string[];
  minutes: number;
  isCustom: boolean;
  ready?: ReadyRoute;
}

export function resolveRouteById(
  routeId: string,
  customRoutes: CustomRoute[],
  lang: Lang
): ResolvedRoute | null {
  const ready = readyRoutes.find((r) => r.id === routeId);
  if (ready){
    return {
      id: ready.id,
      title: ready.name[lang],
      subtitle: ready.sub[lang],
      stops: ready.stops,
      minutes: ready.minutes,
      isCustom: false,
      ready,
    }
  }

  const custom = customRoutes.find((r) => r.id === routeId);
  if(!custom) return null;

  const {totalMinutes} = computeRouteMetrics(custom.stops);
  return {
    id: custom.id,
    title: custom.name,
    stops: custom.stops,
    minutes: totalMinutes,
    isCustom: true
  };
}

type RoutesState = {
  customRoutes: CustomRoute[];
  active: ActiveHop | null;
  history: CompletedHop[]
  startRoute: (routeId: string) => void;
  markVisited: (pujaId: string) => void;
  unmarkVisited: (pujaId: string) => void;
  clearActive: ()=> void;
  completeActiveRoute: (title: string, stops: string[]) => void;
  saveCustomRoute: (name: string, stops: string[], existingId?: string) => string;
  deleteCustomRoute: (routeId: string) => void;
  clearHistory: () => void;
};

export const useRoutesStore = create<RoutesState>()(
  persist(
    (set, get) => ({
      customRoutes: [],
      active: null,
      history: [],
      startRoute: (routeId) => {
        const current = get().active;
        if (current?.routeId === routeId) return;
        set({
          active: {
            routeId,
            visitedAt: {},
            startedAt: Date.now(),
          },
        });
      },
      markVisited: (pujaId) =>
        set((state) => {
          if (!state.active) return state;
          if (state.active.visitedAt[pujaId]) return state;
          return {
            active: {
              ...state.active,
              visitedAt: {
                ...state.active.visitedAt,
                [pujaId]: Date.now(),
              },
            },
          };
        }),
      unmarkVisited: (pujaId) =>
        set((state) => {
          if (!state.active) return state;
          const nextVisited = { ...state.active.visitedAt };
          delete nextVisited[pujaId];
          return {
            active: {
              ...state.active,
              visitedAt: nextVisited,
            },
          };
        }),
      clearActive: () => set({ active: null }),
             completeActiveRoute: (title, stops) =>
        set((state) => {
          if (!state.active) return state;
          const { km, totalMinutes } = computeRouteMetrics(stops);
          const entry: CompletedHop = {
            id: `hop-${Date.now()}`,
            routeId: state.active.routeId,
            title,
            stopsCount: stops.length,
            km,
            minutes: totalMinutes,
            finishedAt: Date.now(),
          };
          return {
            active: null,
            history: [entry, ...state.history],
          };
        }),

      saveCustomRoute: (name, stops, existingId) => {
        const id = existingId ?? `custom-${Date.now()}`;
        const trimmed = name.trim();
        const now = Date.now();

        set((state) => {
          const exists = state.customRoutes.some((r) => r.id === id);
          if (exists) {
            return {
              customRoutes: state.customRoutes.map((r) =>
                r.id === id ? { ...r, name: trimmed, stops, updatedAt: now } : r
              ),
            };
          }
          return {
            customRoutes: [
              { id, name: trimmed, stops, updatedAt: now },
              ...state.customRoutes,
            ],
          };
        });

        return id;
      },

      deleteCustomRoute: (routeId) =>
        set((state) => ({
          customRoutes: state.customRoutes.filter((r) => r.id !== routeId),
          active: state.active?.routeId === routeId ? null : state.active,
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'pandal-hopper-routes',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


