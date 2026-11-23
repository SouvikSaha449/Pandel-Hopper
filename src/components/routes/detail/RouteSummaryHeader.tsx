import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import { router } from 'expo-router'; 

interface RouteSummaryHeaderProps {
    title: string;
    subtitle?: string;
    stopsCount: number;
    totalMinutes: number;
    km: number;
    onShowOnMap?: () => void;
}

export function RouteSummaryHeader({
    title,
    subtitle,
    stopsCount,
    totalMinutes,
    km,
    onShowOnMap,
}: RouteSummaryHeaderProps) {
    const colors = useTheme();
    const { t } = useTranslation();
    const formatNumber = useNumber();
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const durationText =
        hours > 0
            ? t('common.duration', { h: formatNumber(hours), m: formatNumber(minutes) })
            : t('common.minutes', { m: formatNumber(minutes) });
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            {subtitle ? (
                <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                    {subtitle}
                </Text>
            ) : null}
            <View style={styles.pillsRow}>
                <View style={[styles.pill, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <Ionicons name="trail-sign-outline" size={14} color={colors.accent} />
                    <Text style={[styles.pillText, { color: colors.text }]}>
                        {t('common.pujas', { count: formatNumber(stopsCount) })}
                    </Text>
                </View>
                <View style={[styles.pill, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <Ionicons name="time-outline" size={14} color={colors.accent} />
                    <Text style={[styles.pillText, { color: colors.text }]}>
                        {durationText}
                    </Text>
                </View>
                <View style={[styles.pill, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <Ionicons name="footsteps-outline" size={14} color={colors.accent} />
                    <Text style={[styles.pillText, { color: colors.text }]}>
                        {t('common.km', { km: formatNumber(km.toFixed(1)) })}
                    </Text>
                </View>
            </View>
      <Pressable
        accessibilityRole="button"
        onPress={onShowOnMap ?? (() => router.navigate('/(tabs)'))}
        style={({ pressed }) => [
          styles.mapBtn,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Ionicons name="map-outline" size={16} color={colors.accent} />
        <Text style={[styles.mapBtnText, { color: colors.text }]}>
          {t('routes.showOnMap')}
        </Text>
      </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
    mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
  },
  mapBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});