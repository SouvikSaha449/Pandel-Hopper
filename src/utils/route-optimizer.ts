import { distanceKm } from '@/data/geo';
import { getPuja } from '@/data/pujas';
import { getNearestTransit } from './route-transit';

export function getTransitExitMinutes(pujaId: string): number {
  const info = getNearestTransit(pujaId);
  return info ? info.walkMinutes : 15;
}

function pairDist(aId: string, bId: string): number {
  const a = getPuja(aId);
  const b = getPuja(bId);
  if (!a || !b) return Infinity;
  return distanceKm(a.loc, b.loc);
}

export function calculateTourDistance(tour: string[]): number {
  let total = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    const d = pairDist(tour[i], tour[i + 1]);
    if (d !== Infinity) total += d;
  }
  return total;
}

function run2Opt(tour: string[], lockStart: boolean, lockEnd: boolean): string[] {
  const result = [...tour];
  const n = result.length;
  if (n <= 3) return result;

  const minI = lockStart ? 1 : 1;
  const maxJ = lockEnd ? n - 2 : n - 1;

  let improved = true;
  let iterations = 0;
  const MAX_ITERATIONS = 50;

  while (improved && iterations < MAX_ITERATIONS) {
    improved = false;
    iterations++;

    for (let i = minI; i < maxJ; i++) {
      for (let j = i + 1; j <= maxJ; j++) {
        const dOld =
          pairDist(result[i - 1], result[i]) +
          (j < n - 1 ? pairDist(result[j], result[j + 1]) : 0);

        const dNew =
          pairDist(result[i - 1], result[j]) +
          (j < n - 1 ? pairDist(result[i], result[j + 1]) : 0);

        const delta = dNew - dOld;

        if (delta < -0.001) {
          let left = i;
          let right = j;
          while (left < right) {
            const temp = result[left];
            result[left] = result[right];
            result[right] = temp;
            left++;
            right--;
          }
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  return result;
}

function runNearestNeighbor(startId: string, stopsToVisit: string[]): string[] {
  const tour: string[] = [startId];
  const remaining = new Set(stopsToVisit.filter((id) => id !== startId));

  while (remaining.size > 0) {
    const currentId = tour[tour.length - 1];
    let bestId: string | null = null;
    let bestDist = Infinity;

    for (const candidateId of remaining) {
      const d = pairDist(currentId, candidateId);
      if (d < bestDist) {
        bestDist = d;
        bestId = candidateId;
      }
    }

    const nextId = bestId ?? remaining.values().next().value!;
    tour.push(nextId);
    remaining.delete(nextId);
  }

  return tour;
}

function evaluateTourCost(tour: string[]): number {
  const internalDist = calculateTourDistance(tour);
  const firstStopId = tour[0];
  const finalStopId = tour[tour.length - 1];

  const entryWalkMinutes = getTransitExitMinutes(firstStopId);
  const exitWalkMinutes = getTransitExitMinutes(finalStopId);

  const transitPenaltyKm = ((entryWalkMinutes * 0.4 + exitWalkMinutes * 0.6) / 13);
  return internalDist + transitPenaltyKm;
}

export type OptimizationOptions = {
  lockStart?: boolean;
  lockEnd?: boolean;
};

export function optimizeStopOrder(
  stops: string[],
  options: OptimizationOptions = {}
): string[] {
  const { lockStart = false, lockEnd = false } = options;

  if (stops.length <= 2) {
    return [...stops];
  }

  if (lockStart && lockEnd) {
    const startId = stops[0];
    const endId = stops[stops.length - 1];
    const middleStops = stops.slice(1, -1);

    const greedyMiddle = runNearestNeighbor(startId, [startId, ...middleStops]);
    const initialTour = [...greedyMiddle, endId];
    return run2Opt(initialTour, true, true);
  }

  if (lockStart && !lockEnd) {
    const initialTour = runNearestNeighbor(stops[0], stops);
    return run2Opt(initialTour, true, false);
  }

  if (!lockStart && lockEnd) {
    const endId = stops[stops.length - 1];
    const reversedGreedy = runNearestNeighbor(endId, stops);
    const optimizedReversed = run2Opt(reversedGreedy, true, false);
    return optimizedReversed.reverse();
  }

  let bestTour: string[] = [];
  let minCost = Infinity;

  for (const candidateStart of stops) {
    const candidateTour = run2Opt(runNearestNeighbor(candidateStart, stops), true, false);
    const reversedTour = [...candidateTour].reverse();

    const costForward = evaluateTourCost(candidateTour);
    const costReversed = evaluateTourCost(reversedTour);

    const winningCandidate = costForward <= costReversed ? candidateTour : reversedTour;
    const winningCost = Math.min(costForward, costReversed);

    if (winningCost < minCost) {
      minCost = winningCost;
      bestTour = winningCandidate;
    }
  }

  return bestTour.length > 0 ? bestTour : [...stops];
}