import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';

interface RouteCompleteHeroProps {
  title: string;
  routeTitle: string;
}

export function RouteCompleteHero({ title, routeTitle }: RouteCompleteHeroProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.badgeRing}>
        <View style={styles.badgeCore}>
          <Ionicons name="checkmark" size={44} color="#4ADE80" />
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {routeTitle} · Finished just now
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  badgeRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeCore: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(74, 222, 128, 0.22)',
    borderWidth: 2,
    borderColor: '#4ADE80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});