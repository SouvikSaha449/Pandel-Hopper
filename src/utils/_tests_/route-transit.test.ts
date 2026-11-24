import { getNearestTransit } from '@/utils/route-transit';

describe('Route Transit Resolution', () => {
  it('returns null for an invalid or non-existent puja ID', () => {
    const transit = getNearestTransit('non-existent-puja');
    expect(transit).toBeNull();
  });

  it('resolves the nearest Metro station and walk time for Baghbazar Sarbojanin', () => {
    const transit = getNearestTransit('baghbazar');

    expect(transit).not.toBeNull();
    expect(typeof transit?.stationName).toBe('string');
    expect(transit?.stationName).toBe('Shyambazar');
    expect(transit?.walkMinutes).toBeGreaterThanOrEqual(3);
  });

  it('resolves Central Kolkata Metro (MG Road or Girish Park) for Chorebagan', () => {
    const transit = getNearestTransit('chorebagan');

    expect(transit).not.toBeNull();
    expect(['MG Road', 'Girish Park']).toContain(transit?.stationName);
    expect(transit?.walkMinutes).toBeGreaterThanOrEqual(3);
  });

  it('resolves South Kolkata Metro for Ballygunge Cultural', () => {
    const transit = getNearestTransit('ballygunge-cultural');

    expect(transit).not.toBeNull();
    expect(['Kalighat', 'Jatin Das Park']).toContain(transit?.stationName);
    expect(transit?.walkMinutes).toBeGreaterThanOrEqual(3);
  });
});