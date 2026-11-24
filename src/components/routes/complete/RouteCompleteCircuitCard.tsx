import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Polyline, Rect } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { usePrefs } from '@/store/prefs';
import { getPuja } from '@/data/pujas';
import { getNearestTransit } from '@/utils/route-transit';
import { formatMetroName } from '@/data/metro';

interface RouteCompleteCircuitCardProps {
  stops: string[];
  km: number;
}

export function RouteCompleteCircuitCard({ stops, km }: RouteCompleteCircuitCardProps) {
  const colors = useTheme();
  const lang = usePrefs((s) => s.lang);

  const firstTransit = stops.length > 0 ? getNearestTransit(stops[0]) : null;
  const lastTransit = stops.length > 1 ? getNearestTransit(stops[stops.length - 1]) : null;

  // Compact GPS normalization into 320x140 SVG canvas
  const points = useMemo(() => {
    const coords = stops
      .map((id) => getPuja(id)?.loc)
      .filter((loc): loc is { lat: number; lng: number } => Boolean(loc));

    if (coords.length < 2) return null;

    const lats = coords.map((c) => c.lat);
    const lngs = coords.map((c) => c.lng);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const dLat = maxLat - minLat || 0.001, dLng = maxLng - minLng || 0.001;

    return coords.map((c) => ({
      x: 24 + ((c.lng - minLng) / dLng) * 272,
      y: 116 - ((c.lat - minLat) / dLat) * 92,
    }));
  }, [stops]);

  if (!points) return null;
  const pointsStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <Ionicons name="map" size={14} color="#2DD4BF" />
          <Text style={styles.badgeText}>CIRCUIT TRAIL</Text>
        </View>
        <Text style={[styles.metaText, { color: colors.textMuted }]}>{km.toFixed(1)} km mapped</Text>
      </View>

      <View style={styles.canvasWrapper}>
        <Svg width="100%" height={140} viewBox="0 0 320 140">
          <Rect width="320" height="140" rx={14} fill="#140F22" />
          {/* Glowing Trail */}
          <Polyline points={pointsStr} fill="none" stroke="rgba(45,212,191,0.25)" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          <Polyline points={pointsStr} fill="none" stroke="#2DD4BF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          {/* Nodes */}
          {points.map((p, i) => (
            <Circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === 0 || i === points.length - 1 ? 6 : 3.5}
              fill={i === 0 || i === points.length - 1 ? '#FF7A5C' : '#2DD4BF'}
              stroke="#FFFFFF"
              strokeWidth={1.5}
            />
          ))}
        </Svg>
      </View>

      {/* Transit Anchors */}
      <View style={[styles.transitRow, { borderTopColor: colors.cardBorder }]}>
        <Text style={[styles.transitText, { color: colors.text }]} numberOfLines={1}>
          🚇 {firstTransit ? formatMetroName(firstTransit.stationName, lang) : 'Start'}
        </Text>
        <Ionicons name="arrow-forward" size={14} color={colors.textMuted} />
        <Text style={[styles.transitText, { color: colors.text }]} numberOfLines={1}>
          🚇 {lastTransit ? formatMetroName(lastTransit.stationName, lang) : 'Exit'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    color: '#2DD4BF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
  },
  canvasWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  transitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  transitText: {
    fontSize: 12,
    fontWeight: '700',
    maxWidth: '45%',
  },
});