import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  RouteCompleteHero,
  RouteCompleteStats,
  RouteCompleteStops,
  RouteCompleteCircuitCard,
} from '@/components/routes';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';
import { resolveRouteById, useRoutesStore } from '@/store/routes';

export default function RouteCompleteScreen() {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();
  const lang = usePrefs((s) => s.lang);

  const history = useRoutesStore((s) => s.history);
  const customRoutes = useRoutesStore((s) => s.customRoutes);
  const latestHop = history[0];

  const resolvedRoute = useMemo(() => {
    if (!latestHop?.routeId) return null;
    return resolveRouteById(latestHop.routeId, customRoutes, lang);
  }, [latestHop, customRoutes, lang]);

  const stops = resolvedRoute?.stops ?? [];

  const formattedDuration = useMemo(() => {
    const min = latestHop?.minutes ?? 0;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0
      ? t('common.duration', { h: formatNumber(h), m: formatNumber(m) })
      : t('common.minutes', { m: formatNumber(m) });
  }, [latestHop, formatNumber, t]);

  const handleShare = async () => {
    if (!latestHop) return;
    const message = `🎉 I just completed "${latestHop.title}" on Pandal Hopping!\n📍 ${latestHop.stopsCount} pujas visited\n🚶 ${latestHop.km} km walked in ${formattedDuration}.\nShubho Sharadiya! 🪔`;
    try {
      await Share.share({ message });
    } catch {
      // User cancelled
    }
  };

  const handleDismiss = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
          onPress={handleDismiss}
          hitSlop={8}
          style={({ pressed }) => [styles.closeBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <RouteCompleteHero
          title={t('complete.title')}
          routeTitle={latestHop?.title ?? 'Durga Puja Hop'}
        />
        <RouteCompleteStats
          stopsCount={latestHop?.stopsCount ?? stops.length}
          km={latestHop?.km ?? 0}
          durationText={formattedDuration}
        />

        <RouteCompleteCircuitCard stops={stops} km={latestHop?.km ?? 0} />

        <RouteCompleteStops stops={stops} />
      </ScrollView>

      <View style={[styles.bottomBar, { borderTopColor: colors.cardBorder }]}>
        <Pressable
          accessibilityRole="button"
          onPress={handleShare}
          style={({ pressed }) => [
            styles.shareBtn,
            { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Ionicons name="share-social" size={20} color="#171325" />
          <Text style={styles.shareBtnText}>{t('complete.share')}</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleDismiss}
          style={({ pressed }) => [
            styles.dismissBtn,
            { borderColor: colors.cardBorder, opacity: pressed ? 0.75 : 1 },
          ]}
        >
          <Text style={[styles.dismissBtnText, { color: colors.text }]}>
            {t('common.backToMap')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  spacer: {
    width: 24,
  },
  closeBtn: {
    padding: 6,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    gap: 10,
  },
  shareBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareBtnText: {
    color: '#171325',
    fontSize: 16,
    fontWeight: '800',
  },
  dismissBtn: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});