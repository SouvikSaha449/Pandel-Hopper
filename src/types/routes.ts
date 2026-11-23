import type { ReadyRoute } from '@/data/routes';

export type CustomRoute = {
  id: string;
  name: string;
  stops: string[];
  updatedAt: number;
};

export type ActiveHop = {
  routeId: string;
  visitedAt: Record<string, number>;
  startedAt: number;
};

export type CompletedHop = {
  id: string;
  routeId: string;
  title: string;
  stops?:string[];
  stopsCount: number;
  km: number;
  minutes: number;
  finishedAt: number;
};

export type RouteMetrics = {
  km: number;
  walkMinutes: number;
  totalMinutes: number;
};

export type ResolvedRoute = {
  id: string;
  title: string;
  subtitle?: string;
  stops: string[];
  minutes: number;
  isCustom: boolean;
  ready?: ReadyRoute;
};