import {
  calculateTourDistance,
  optimizeStopOrder,
} from '@/utils/route-optimizer';

describe('Route Optimizer (TSP & 2-Opt)', () => {
  const scrambledStops = [
    'tala-prattay',
    'college-square',
    'baghbazar',
    'santosh-mitra',
    'kumartuli-park',
  ];

  describe('Edge cases (stops <= 2)', () => {
    it('returns empty array when given empty stops', () => {
      expect(optimizeStopOrder([])).toEqual([]);
    });

    it('returns unchanged for a single stop', () => {
      expect(optimizeStopOrder(['baghbazar'])).toEqual(['baghbazar']);
    });

    it('returns unchanged for two stops', () => {
      const twoStops = ['baghbazar', 'kumartuli-park'];
      expect(optimizeStopOrder(twoStops)).toEqual(twoStops);
    });
  });

  describe('2-Opt optimization efficiency', () => {
    it('reduces or preserves the total walking distance of a scrambled route', () => {
      const initialDist = calculateTourDistance(scrambledStops);
      const optimized = optimizeStopOrder(scrambledStops);
      const optimizedDist = calculateTourDistance(optimized);

      expect(optimizedDist).toBeLessThanOrEqual(initialDist);
    });

    it('preserves all stops without loss or duplication', () => {
      const optimized = optimizeStopOrder(scrambledStops);

      expect(optimized.length).toBe(scrambledStops.length);
      expect(new Set(optimized)).toEqual(new Set(scrambledStops));
    });
  });

  describe('Constraint handling (lockStart & lockEnd)', () => {
    it('preserves the user chosen starting stop when lockStart is true', () => {
      const fixedStart = scrambledStops[0];
      const optimized = optimizeStopOrder(scrambledStops, { lockStart: true });

      expect(optimized[0]).toBe(fixedStart);
      expect(new Set(optimized)).toEqual(new Set(scrambledStops));
    });

    it('preserves the user chosen ending stop when lockEnd is true', () => {
      const fixedEnd = scrambledStops[scrambledStops.length - 1];
      const optimized = optimizeStopOrder(scrambledStops, { lockEnd: true });

      expect(optimized[optimized.length - 1]).toBe(fixedEnd);
      expect(new Set(optimized)).toEqual(new Set(scrambledStops));
    });

    it('preserves both start and end stops when both are locked', () => {
      const fixedStart = scrambledStops[0];
      const fixedEnd = scrambledStops[scrambledStops.length - 1];

      const optimized = optimizeStopOrder(scrambledStops, {
        lockStart: true,
        lockEnd: true,
      });

      expect(optimized[0]).toBe(fixedStart);
      expect(optimized[optimized.length - 1]).toBe(fixedEnd);
      expect(new Set(optimized)).toEqual(new Set(scrambledStops));
    });
  });
});