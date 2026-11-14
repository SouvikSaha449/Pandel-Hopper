import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useRouteTracker } from '@/hooks/use-route-tracker';
import { RouteDetailBottomBar } from '@/components/routes/RouteDetailBottamBar';
import { RouteTimelineList } from '@/components/routes/RouteTimelineList';

export default function RouteDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const tracker = useRouteTracker(id);
    const nextPuja = tracker.nextPuja;
    const route = tracker.route;

    if (!route) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: tracker.colors.bg }]}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color={tracker.colors.text} />
                    </Pressable>
                    <Text style={[styles.headerTitle, { color: tracker.colors.text }]}>
                        {tracker.t('routes.title')}
                    </Text>
                </View>
                <View style={styles.centerBox}>
                    <Text style={{ color: tracker.colors.textMuted }}>Route not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: tracker.colors.bg }]}>

            <View style={styles.header}>
                <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={tracker.colors.text} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: tracker.colors.text }]} numberOfLines={1}>
                    {tracker.t('routes.preview')}
                </Text>
            </View>

            <RouteTimelineList tracker={tracker} />

            <RouteDetailBottomBar
                isActive={tracker.isActive}
                isComplete={tracker.isComplete}
                hasNextStop={Boolean(nextPuja)}
                onStart={tracker.handleStart}
                onCustomize={() =>
                    router.push({
                        pathname: '/route/new',
                        params: route.isCustom
                            ? { edit: route.id }
                            : { from: route.id },
                    })
                }
                onArriveNext={nextPuja ? () => tracker.handleArrive(nextPuja.id) : undefined}
                onEndHop={tracker.handleEndHop}
            />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 52,
        gap: 12,
    },
    backBtn: {
        padding: 6,
        marginLeft: -6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    centerBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});