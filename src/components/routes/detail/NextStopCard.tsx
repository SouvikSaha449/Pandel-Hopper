import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface NextStopCardProps {
  pujaName: string;
  visitedCount: number;
  totalStops: number;
  onArrive: () => void;
}

export function NextStopCard({
  pujaName,
  visitedCount,
  totalStops,
  onArrive,
}: NextStopCardProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

   return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.accent },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.accentBg }]}>
          <Text style={[styles.badgeText, { color: colors.accent }]}>
            {t('routes.next').toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.progressText, { color: colors.textMuted }]}>
          {t('routes.visitedOf', {
            done: formatNumber(visitedCount),
            total: formatNumber(totalStops),
          })}
        </Text>
      </View>
      <Text style={[styles.name, { color: colors.text }]}>{pujaName}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onArrive}
        style={({ pressed }) => [
          styles.arriveBtn,
          { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
        <Text style={styles.arriveBtnText}>{t('routes.iAmHere')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  arriveBtn: {
    height: 44,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  arriveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});