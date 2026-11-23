import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface RouteEditorBottomBarProps {
  stopsCount: number;
  totalMinutes: number;
  km: number;
  canOptimize: boolean;
  onOptimize: () => void;
  onStartRoute: () => void;
}

export function RouteEditorBottomBar({
  stopsCount,
  totalMinutes,
  km,
  canOptimize,
  onOptimize,
  onStartRoute,
}: RouteEditorBottomBarProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  const formattedDuration =
    totalMinutes >= 60
      ? t('common.duration', {
          h: formatNumber(Math.floor(totalMinutes / 60)),
          m: formatNumber(totalMinutes % 60),
        })
      : t('common.minutes', { m: formatNumber(totalMinutes) });

  const hasStops = stopsCount > 0;

  return (
    <View
      style={[
        styles.bottomBar,
        { backgroundColor: colors.card, borderTopColor: colors.cardBorder },
      ]}
    >

      <View style={styles.metricsContainer}>
        <Text style={[styles.mainMetrics, { color: colors.text }]}>
          {t('common.pujas', { count: formatNumber(stopsCount) })} · {formattedDuration}
        </Text>
        <Text style={[styles.subMetrics, { color: colors.textMuted }]}>
          {t('routes.walkingAbout', { km: formatNumber(km.toFixed(1)) })}
        </Text>
      </View>

      <View style={styles.actionsRow}>
           <Pressable
          accessibilityRole="button"
          disabled={!canOptimize}
          onPress={onOptimize}
          style={({ pressed }) => [
            styles.optimizeBtn,
            {
              backgroundColor: colors.card,
              borderColor: colors.accent,
              opacity: !canOptimize ? 0.35 : pressed ? 0.75 : 1,
            },
          ]}
        >
          <Ionicons name="sparkles" size={16} color={colors.accent} />
          <Text
            numberOfLines={1}
            style={[styles.optimizeBtnText, { color: colors.accent }]}
          >
            {t('routes.optimize')}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          disabled={!hasStops}
          onPress={onStartRoute}
          style={({ pressed }) => [
            styles.startBtn,
            {
              backgroundColor: colors.accent,
              opacity: !hasStops ? 0.4 : pressed ? 0.85 : 1,
            },
          ]}
        >
          <Ionicons name="navigate" size={18} color="#171325" />
          <Text style={styles.startBtnText}>{t('routes.startRoute')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  metricsContainer: {
    gap: 2,
  },
  mainMetrics: {
    fontSize: 16,
    fontWeight: '800',
  },
  subMetrics: {
    fontSize: 13,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
 optimizeBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  optimizeBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  startBtn: {
    flex: 1, 
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startBtnText: {
    color: '#171325',
    fontSize: 16,
    fontWeight: '800',
  },
});