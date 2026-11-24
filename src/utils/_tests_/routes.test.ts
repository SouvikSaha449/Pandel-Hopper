import { useRoutesStore } from '@/store/routes';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Routes Store (Zustand)', () => {
  beforeEach(() => {

    useRoutesStore.setState({
      customRoutes: [],
      active: null,
      history: [],
    });
  });

  describe('Active Hop Lifecycle', () => {
    it('starts a route and initializes active state', () => {
      const { startRoute } = useRoutesStore.getState();
      startRoute('north-kolkata-hopping');

      const active = useRoutesStore.getState().active;
      expect(active).not.toBeNull();
      expect(active?.routeId).toBe('north-kolkata-hopping');
      expect(active?.visitedAt).toEqual({});
      expect(typeof active?.startedAt).toBe('number');
    });

    it('does not reset visited progress if startRoute is called with the same routeId', () => {
      const { startRoute, markVisited } = useRoutesStore.getState();
      startRoute('north-kolkata-hopping');
      markVisited('baghbazar');

      const firstTimestamp = useRoutesStore.getState().active?.visitedAt['baghbazar'];
      expect(firstTimestamp).toBeDefined();

      startRoute('north-kolkata-hopping');
      const secondTimestamp = useRoutesStore.getState().active?.visitedAt['baghbazar'];
      expect(secondTimestamp).toBe(firstTimestamp);
    });

    it('marks and unmarks stops as visited', () => {
      const { startRoute, markVisited, unmarkVisited } = useRoutesStore.getState();
      startRoute('custom-hop');

      markVisited('kumartuli-park');
      expect(useRoutesStore.getState().active?.visitedAt['kumartuli-park']).toBeDefined();

      unmarkVisited('kumartuli-park');
      expect(useRoutesStore.getState().active?.visitedAt['kumartuli-park']).toBeUndefined();
    });

    it('clears active route', () => {
      const { startRoute, clearActive } = useRoutesStore.getState();
      startRoute('custom-hop');
      expect(useRoutesStore.getState().active).not.toBeNull();

      clearActive();
      expect(useRoutesStore.getState().active).toBeNull();
    });
  });

  describe('Route Completion', () => {
    it('completes active route, computes metrics, and pushes to history', () => {
      const { startRoute, completeActiveRoute } = useRoutesStore.getState();
      startRoute('north-kolkata-hopping');

      const stops = ['baghbazar', 'kumartuli-park'];
      completeActiveRoute('North Kolkata Hopping', stops);

      const state = useRoutesStore.getState();
      expect(state.active).toBeNull();
      expect(state.history.length).toBe(1);

      const latest = state.history[0];
      expect(latest.title).toBe('North Kolkata Hopping');
      expect(latest.routeId).toBe('north-kolkata-hopping');
      expect(latest.stops).toEqual(stops);
      expect(latest.stopsCount).toBe(2);
      expect(latest.km).toBeGreaterThan(0);
      expect(latest.minutes).toBeGreaterThan(0);
    });
  });

  describe('Custom Route Builder & CRUD', () => {
    it('saves a new custom route with generated ID', () => {
      const { saveCustomRoute } = useRoutesStore.getState();
      const id = saveCustomRoute('My Pandal Plan', ['baghbazar', 'sikdar-bagan']);

      expect(typeof id).toBe('string');
      const custom = useRoutesStore.getState().customRoutes;
      expect(custom.length).toBe(1);
      expect(custom[0].id).toBe(id);
      expect(custom[0].name).toBe('My Pandal Plan');
      expect(custom[0].stops).toEqual(['baghbazar', 'sikdar-bagan']);
    });

    it('updates an existing custom route when existingId is supplied', () => {
      const { saveCustomRoute } = useRoutesStore.getState();
      const id = saveCustomRoute('Original Name', ['baghbazar']);

      saveCustomRoute('Updated Name', ['baghbazar', 'kumartuli-park'], id);

      const custom = useRoutesStore.getState().customRoutes;
      expect(custom.length).toBe(1);
      expect(custom[0].id).toBe(id);
      expect(custom[0].name).toBe('Updated Name');
      expect(custom[0].stops.length).toBe(2);
    });

    it('deletes custom route and clears active if it was the active route', () => {
      const { saveCustomRoute, startRoute, deleteCustomRoute } = useRoutesStore.getState();
      const id = saveCustomRoute('Route To Delete', ['baghbazar']);
      startRoute(id);

      expect(useRoutesStore.getState().active?.routeId).toBe(id);

      deleteCustomRoute(id);

      const state = useRoutesStore.getState();
      expect(state.customRoutes.some((r) => r.id === id)).toBe(false);
      expect(state.active).toBeNull();
    });
  });

  describe('History Management', () => {
    it('deletes a single history entry', () => {
      const { startRoute, completeActiveRoute, deleteHistoryEntry } = useRoutesStore.getState();
      startRoute('route-1');
      completeActiveRoute('Hop 1', ['baghbazar']);

      const entryId = useRoutesStore.getState().history[0].id;
      deleteHistoryEntry(entryId);

      expect(useRoutesStore.getState().history.length).toBe(0);
    });

    it('clears all history entries', () => {
      const { startRoute, completeActiveRoute, clearHistory } = useRoutesStore.getState();
      startRoute('route-1');
      completeActiveRoute('Hop 1', ['baghbazar']);

      clearHistory();
      expect(useRoutesStore.getState().history).toEqual([]);
    });
  });
});