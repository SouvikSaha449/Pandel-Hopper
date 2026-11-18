import { distanceKm } from '@/data/geo';
import { getPuja } from '@/data/pujas';

function calculateTourDistance(stopIds: string[]): number {
  let total = 0;
  for (let i = 0; i < stopIds.length - 1; i++) {
    const from = getPuja(stopIds[i]);
    const to = getPuja(stopIds[i + 1]);
    if (from && to) {
      total += distanceKm(from.loc, to.loc);
    }
  }
  return total;
}

export function optimizeStopOrder(stops: string[]): string[] {
  if (stops.length <= 2) {
    return [...stops];
  }

  const ordered: string[] = [stops[0]];
  const remaining = new Set(stops.slice(1));

  while (remaining.size > 0) {
    const current = getPuja(ordered[ordered.length - 1]);
    let bestId: string | null = null;
    let bestDist = Infinity;

    for (const candidateId of remaining) {
      const candidate = getPuja(candidateId);
      const d = current && candidate ? distanceKm(current.loc, candidate.loc) : Infinity;
      if (d < bestDist) {
        bestDist = d;
        bestId = candidateId;
      }
    }

    const nextId = bestId ?? remaining.values().next().value!;
    ordered.push(nextId);
    remaining.delete(nextId);
  }

  let tour = [...ordered];
  let improved = true;
  let iterations = 0;
  const MAX_ITERATIONS = 50;

  while (improved && iterations < MAX_ITERATIONS) {
    improved = false;
    iterations++;

    for (let i = 1; i < tour.length - 1; i++) {
      for (let j = i + 1; j < tour.length; j++) {
        const candidateTour = [
          ...tour.slice(0, i),
          ...tour.slice(i, j + 1).reverse(),
          ...tour.slice(j + 1),
        ];

        if (calculateTourDistance(candidateTour) + 0.001 < calculateTourDistance(tour)) {
          tour = candidateTour;
          improved = true;
          break; 
        }
      }
      if (improved) break;
    }
  }

  return tour;
}