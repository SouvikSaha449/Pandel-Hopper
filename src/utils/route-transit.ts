import { distanceKm } from '@/data/geo';
import { getPuja } from '@/data/pujas';
import { metroStations } from '@/data/metro';

export type TransitInfo = {
  stationName: string;
  walkMinutes: number;
};

export function getNearestTransit(pujaId: string): TransitInfo | null {
  const puja = getPuja(pujaId);
  if (!puja) return null;

  let nearestStation = metroStations[0];
  let minDist = Infinity;

  for (const station of metroStations) {
    const d = distanceKm(puja.loc, station);
    if (d < minDist) {
      minDist = d;
      nearestStation = station;
    }
  }

  const walkMinutes = Math.max(3, Math.round(((minDist * 1.2) / 4.5) * 60));

  return {
    stationName: nearestStation.name,
    walkMinutes,
  };
}