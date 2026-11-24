import { getPuja, type Puja } from '@/data/pujas';
import { usePrefs } from '@/store/prefs';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Saved & Favourites Store (usePrefs)', () => {
  beforeEach(() => {

    usePrefs.setState({
      favourites: [],
      savedRoutes: [],
    });
  });

  describe('Favourites Toggle Lifecycle', () => {
    it('initializes with empty favourites array', () => {
      const { favourites } = usePrefs.getState();
      expect(favourites).toEqual([]);
    });

    it('adds a puja to favourites when toggled on', () => {
      const { toggleFavourite } = usePrefs.getState();
      toggleFavourite('baghbazar');

      const { favourites } = usePrefs.getState();
      expect(favourites).toContain('baghbazar');
      expect(favourites.length).toBe(1);
    });

    it('removes a puja from favourites when toggled a second time', () => {
      const { toggleFavourite } = usePrefs.getState();
      toggleFavourite('baghbazar');
      expect(usePrefs.getState().favourites).toContain('baghbazar');

      toggleFavourite('baghbazar');
      expect(usePrefs.getState().favourites).not.toContain('baghbazar');
      expect(usePrefs.getState().favourites.length).toBe(0);
    });

    it('maintains multiple favourited pujas without duplicates', () => {
      const { toggleFavourite } = usePrefs.getState();
      toggleFavourite('baghbazar');
      toggleFavourite('kumartuli-park');
      toggleFavourite('ahiritola');

      const { favourites } = usePrefs.getState();
      expect(favourites).toEqual(['baghbazar', 'kumartuli-park', 'ahiritola']);
      expect(favourites.length).toBe(3);
    });

    it('clears all favourites in one action', () => {
      const { toggleFavourite, clearFavourites } = usePrefs.getState();
      toggleFavourite('baghbazar');
      toggleFavourite('kumartuli-park');
      expect(usePrefs.getState().favourites.length).toBe(2);

      clearFavourites();
      expect(usePrefs.getState().favourites).toEqual([]);
    });
  });

  describe('Saved Ready Routes Lifecycle', () => {
    it('toggles saved ready-made routes on and off', () => {
      const { toggleSavedRoute } = usePrefs.getState();
      toggleSavedRoute('north-kolkata-hopping');

      expect(usePrefs.getState().savedRoutes).toContain('north-kolkata-hopping');

      toggleSavedRoute('north-kolkata-hopping');
      expect(usePrefs.getState().savedRoutes).not.toContain('north-kolkata-hopping');
    });
  });

  describe('Pandal Database Resolution', () => {
    it('resolves favourited puja IDs into valid Puja entities', () => {
      const { toggleFavourite } = usePrefs.getState();
      toggleFavourite('baghbazar');
      toggleFavourite('kumartuli-park');

      const resolved = usePrefs
        .getState()
        .favourites.map(getPuja)
        .filter((p): p is Puja => Boolean(p));

      expect(resolved.length).toBe(2);
      expect(resolved[0].id).toBe('baghbazar');
      expect(resolved[0].name.en).toBe('Baghbazar Sarbojanin');
      expect(resolved[1].id).toBe('kumartuli-park');
      expect(resolved[1].loc.lat).toBeGreaterThan(0);
    });

    it('safely filters out non-existent or stale puja IDs', () => {
      const { toggleFavourite } = usePrefs.getState();
      toggleFavourite('baghbazar');
      toggleFavourite('non-existent-puja');

      const resolved = usePrefs
        .getState()
        .favourites.map(getPuja)
        .filter((p): p is Puja => Boolean(p));

      expect(resolved.length).toBe(1);
      expect(resolved[0].id).toBe('baghbazar');
    });
  });
});