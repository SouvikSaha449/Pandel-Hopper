import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { readyRoutes } from '@/data/routes';
import { usePrefs } from '@/store/prefs';
import { resolveRouteById, useRoutesStore } from '@/store/routes';
import { RouteCard } from '@/components/routes/RouteCard';
import { RouteSegmentTabs, type RouteSegment } from '@/components/routes/RouteSegmentTabs';

export default function RoutesScreen() {
  const colors = useTheme();
  const isDark = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const [segment, setSegment] = useState<RouteSegment>('ready');

  const lang = usePrefs((s) => s.lang);
  const active = useRoutesStore((s) => s.active);
  const customRoutes = useRoutesStore((s) => s.customRoutes);
  const startRoute = useRoutesStore((s) => s.startRoute);
  const clearActive = useRoutesStore((s) => s.clearActive);

  const activeRoute = active ? resolveRouteById(active.routeId, customRoutes, lang) : null;
  const activeDone =
    active && activeRoute
      ? activeRoute.stops.filter((id) => Boolean(active.visitedAt[id])).length
      : 0;

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{t('routes.title')}</Text>
        <RouteSegmentTabs selected={segment} onSelect={setSegment} />
      </View>

      {segment === 'ready' ? (
        <FlatList
          data={readyRoutes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Pressable
                style={({ pressed }) => [
                  styles.createBtn,
                  {
                    borderColor: colors.accent,
                    backgroundColor: colors.accentBg,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Ionicons name="add" size={22} color={isDark ? colors.text : colors.accent} />
                <Text style={[styles.createText, { color: isDark ? colors.text : colors.accent }]}>
                  {t('routes.createOwn')}
                </Text>
              </Pressable>

              {activeRoute ? (
                <View style={styles.sectionBlock}>
                  <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                    {t('routes.inProgress')}
                  </Text>
                  <RouteCard
                    title={activeRoute.title}
                    subtitle={activeRoute.subtitle}
                    stopsCount={activeRoute.stops.length}
                    minutes={activeRoute.minutes}
                    progress={{ done: activeDone, total: activeRoute.stops.length }}
                    onPress={clearActive}
                  />
                </View>
              ) : null}

              <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                {t('routes.readyMadeLabel')}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <RouteCard
              title={item.name[lang]}
              subtitle={item.sub[lang]}
              stopsCount={item.stops.length}
              minutes={item.minutes}
              onPress={() => startRoute(item.id)}
            />
          )}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 32,
    gap: 12,
  },
  listHeader: {
    gap: 20,
    marginBottom: 4,
  },
  createBtn: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createText: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionBlock: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});