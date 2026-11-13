import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';

interface RouteDetailBottomBarProps {
    isActive: boolean;
    isComplete: boolean;
    hasNextStop: boolean;
    onStart: () => void;
    onArriveNext?: () => void;
    onEndHop?: () => void;
}

export function RouteDetailBottomBar({
    isActive,
    isComplete,
    hasNextStop,
    onStart,
    onArriveNext,
    onEndHop,
}: RouteDetailBottomBarProps) {

    const colors = useTheme();
    const { t } = useTranslation();

    return (
        <View
            style={[
                styles.bottomBar,
                { backgroundColor: colors.card, borderTopColor: colors.cardBorder },
            ]}
        >
            {!isActive ? (
                <View style={styles.buttonsRow}>
                    <Pressable
                        accessibilityRole="button"
                        onPress={onStart}
                        style={({ pressed }) => [
                            styles.primaryBtn,
                            { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
                        ]}
                    >
                        <Ionicons name="play" size={18} color="#FFFFFF" />
                        <Text style={styles.primaryBtnText}>{t('routes.startRoute')}</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.buttonsRow}>
                    <Pressable
                        accessibilityRole="button"
                        onPress={onEndHop}
                        style={({ pressed }) => [
                            styles.secondaryBtn,
                            { borderColor: colors.cardBorder, opacity: pressed ? 0.85 : 1 },
                        ]}
                    >
                        <Text style={[styles.secondaryBtnText, { color: colors.text }]}>
                            {isComplete ? t('routes.finishRoute') : t('routes.endHop')}
                        </Text>
                    </Pressable>

                    {hasNextStop && onArriveNext ? (
                        <Pressable
                            accessibilityRole="button"
                            onPress={onArriveNext}
                            style={({ pressed }) => [
                                styles.primaryBtn,
                                { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
                            ]}
                        >
                            <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                            <Text style={styles.primaryBtnText}>{t('routes.iAmHere')}</Text>
                        </Pressable>
                    ) : null}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    primaryBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    primaryBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryBtnText: {
        fontSize: 15,
        fontWeight: '600',
    },
});