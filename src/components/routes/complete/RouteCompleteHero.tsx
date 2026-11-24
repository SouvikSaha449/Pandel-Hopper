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

      <View style={[styles.haloRing, { backgroundColor: colors.accentBg }]}>
        <View style={styles.goldMedalRing}>
          <View style={[styles.badgeCore, { backgroundColor: colors.accent }]}>
            <Ionicons name="trophy" size={32} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <View style={styles.milestonePill}>
        <Text style={styles.milestoneText}>✨ CIRCUIT CONQUERED</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={styles.subtitleBlock}>
        <Text style={[styles.routeTitle, { color: colors.accent }]} numberOfLines={1}>
          {routeTitle}
        </Text>
        <Text style={[styles.greeting, { color: colors.textMuted }]}>
          Finished just now · Shubho Sharadiya! 🪔
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  haloRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 166, 35, 0.25)',
    marginBottom: 4,
  },
  goldMedalRing: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F5A623',
    backgroundColor: 'rgba(255, 122, 92, 0.2)',
  },
  badgeCore: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  milestonePill: {
    backgroundColor: 'rgba(245, 166, 35, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 166, 35, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  milestoneText: {
    color: '#F5A623',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitleBlock: {
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 24,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  greeting: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});