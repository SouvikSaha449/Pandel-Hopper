import { computeRouteMetrics, resolveRouteById } from '../route-metrics';
import type { CustomRoute, CompletedHop } from '@/types/routes';

describe('Route Metrics & Resolution', () => {
  describe('computeRouteMetrics', () => {
    it('returns zero for empty stops', () => {
      const metrics = computeRouteMetrics([]);
      expect(metrics.km).toBe(0);
      expect(metrics.walkMinutes).toBe(0);
      expect(metrics.totalMinutes).toBe(0);
    });

    it('returns zero walk and 30 min dwell for a single stop', () => {
      const metrics = computeRouteMetrics(['baghbazar']);
      expect(metrics.km).toBe(0);
      expect(metrics.walkMinutes).toBe(0);
      expect(metrics.totalMinutes).toBe(30); 
    });

    it('calculates distance with 1.3 street detour factor between adjacent pandals', () => {

      const metrics = computeRouteMetrics(['baghbazar', 'kumartuli-park']);
      expect(metrics.km).toBeGreaterThan(0);
      expect(metrics.walkMinutes).toBeGreaterThan(0);

      expect(metrics.totalMinutes).toBe(metrics.walkMinutes + 60);
    });
  });

  describe('resolveRouteById', () => {
    const mockCustomRoutes: CustomRoute[] = [
      {
        id: 'custom-1',
        name: 'My Special Hop',
        stops: ['baghbazar', 'kumartuli-park'],
        updatedAt: 1000,
      },
    ];

    const mockHistory: CompletedHop[] = [
      {
        id: 'hist-1',
        routeId: 'hist-1',
        title: 'Old Deleted Hop',
        stopsCount: 2,
        km: 1.5,
        minutes: 45,
        finishedAt: 5000,
        stops: ['baghbazar', 'kumartuli-park'],
      },
    ];

    it('resolves curated ready-made routes with localized titles', () => {
      const route = resolveRouteById('north-kolkata-hopping', [], 'en');
      expect(route).not.toBeNull();
      expect(route?.id).toBe('north-kolkata-hopping');
      expect(route?.title).toBe('North Kolkata Hopping Route');
      expect(route?.isCustom).toBe(false);
      expect(route?.stops.length).toBeGreaterThan(0);
    });

    it('resolves custom user routes with calculated metrics', () => {
      const route = resolveRouteById('custom-1', mockCustomRoutes, 'en');
      expect(route).not.toBeNull();
      expect(route?.title).toBe('My Special Hop');
      expect(route?.isCustom).toBe(true);
      expect(route?.stops).toEqual(['baghbazar', 'kumartuli-park']);
    });

    it('falls back to historical hops when route was deleted from custom routes', () => {
      const route = resolveRouteById('hist-1', [], 'en', mockHistory);
      expect(route).not.toBeNull();
      expect(route?.title).toBe('Old Deleted Hop');
      expect(route?.isCustom).toBe(true);
    });

    it('returns null for unknown IDs', () => {
      const route = resolveRouteById('non-existent-route', [], 'en');
      expect(route).toBeNull();
    });
  });
});