import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { readyRoutes } from '@/data/routes';
import { usePrefs } from '@/store/prefs';
import { resolveRouteById, useRoutesStore } from '@/store/routes';
import { CreateRouteButton } from './CreateRouteButton';
import { RouteCard } from './RouteCard';
import { router } from 'expo-router';

export function ReadyMadeTab() {
    const colors = useTheme();
    const { t } = useTranslation();

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
        <FlatList
            data={readyRoutes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
                <View style={styles.listHeader}>
                    <CreateRouteButton />

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
                                onPress={() =>
                                    router.push({
                                        pathname: '/route/[id]',
                                        params: { id: activeRoute.id },
                                    })
                                }
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
                    onPress={() =>
                        router.push({
                            pathname: '/route/[id]',
                            params: { id: item.id },
                        })
                    }
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
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
    sectionBlock: {
        gap: 10,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
});