import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Image, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useRouter } from 'expo-router';

const NATIVE = 200;
const LOGO = 360;
const HOLD_MS = 1300;

const LIGHT = { bg: '#FBF7F0', text: '#2A1F1A', muted: '#6B5B52', accent: '#C8341F', glow: '#F2B04A', glowAlpha: 0.28 };
const DARK = { bg: '#171325', text: '#F3EEF8', muted: '#B8AECB', accent: '#FF7A5C', glow: '#FF7A5C', glowAlpha: 0.2 };

type Props = { title?: string; tagline?: string; onDone: () => void };

export default function AnimatedSplash({ title = 'Pandal Hopper', tagline = 'Plan your route', onDone }: Props) {
    const c = useColorScheme() === 'dark' ? DARK : LIGHT;
    const { height } = useWindowDimensions();
    const move = useRef(new Animated.Value(0)).current;
    const dots = useRef(new Animated.Value(0)).current;
    const out = useRef(new Animated.Value(1)).current;
    const [still, setStill] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let alive = true;
        let loop: Animated.CompositeAnimation | undefined;

        AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
            if (!alive) return;
            if (reduce) {
                setStill(true);
                move.setValue(1);
            } else {
                Animated.timing(move, { toValue: 1, duration: 600, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
                loop = Animated.loop(Animated.timing(dots, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true }));
                loop.start();
            }
        });

        const timer = setTimeout(() => {
            if (alive) {
                router.replace('/welcome');
            }
        }, HOLD_MS);

        return () => {
            alive = false;
            loop?.stop();
            clearTimeout(timer);
        };
    }, []);

    const start = height / 2;
    const end = height * 0.39;
    const logoY = move.interpolate({ inputRange: [0, 1], outputRange: [0, end - start] });
    const logoScale = move.interpolate({ inputRange: [0, 1], outputRange: [NATIVE / LOGO, 1] });
    const textY = move.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
    const pulse = (i: number) => {
        const center = i / 3 + 0.15;        // dot 0 → 0.15, dot 1 → 0.48, dot 2 → 0.82
        const half = 0.12;                   // each dot's fade window (must be < gap of 0.33)
        const range = [center - half, center, center + half];
        return {
            opacity: dots.interpolate({ inputRange: range, outputRange: [0.2, 1, 0.2], extrapolate: 'clamp' }),
            scale: dots.interpolate({ inputRange: range, outputRange: [1, 1, 1], extrapolate: 'clamp' }),
        };
    };

    return (
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: c.bg, opacity: out }]}>
            <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: end - 230, alignItems: 'center', opacity: move }}>
                <Svg width={460} height={460}>
                    <Defs>
                        <RadialGradient id="g" cx="50%" cy="50%" r="50%">
                            <Stop offset="0" stopColor={c.glow} stopOpacity={c.glowAlpha} />
                            <Stop offset="0.68" stopColor={c.glow} stopOpacity={0} />
                        </RadialGradient>
                    </Defs>
                    <Rect width={460} height={460} fill="url(#g)" />
                </Svg>
            </Animated.View>

            <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: start - LOGO / 2, alignItems: 'center', transform: [{ translateY: logoY }, { scale: logoScale }] }}>
                <Image source={require('../../assets/images/pandel_hopper_logo.png')} style={{ width: LOGO, height: LOGO }} resizeMode="contain" />
            </Animated.View>

            <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: end + LOGO / 2 + 0, alignItems: 'center', opacity: move, transform: [{ translateY: textY }] }}>
                <Text style={{ fontSize: 32, fontWeight: '700', color: c.text }}>{title}</Text>
            </Animated.View>

            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 64, alignItems: 'center', gap: 16 }}>
                <View style={{ flexDirection: 'row', gap: 10, height: 16, alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => {
                        const p = pulse(i);
                        return (
                            <Animated.View
                                key={i}
                                style={{
                                    width: 8, height: 8, borderRadius: 4, backgroundColor: c.accent,
                                    opacity: still ? 0.6 : p.opacity,
                                    transform: [{ scale: still ? 1 : p.scale }],
                                }}
                            />
                        );
                    })}
                </View>
                <Text style={{ fontSize: 14, color: c.muted }}>{tagline}</Text>
            </View>
        </Animated.View>
    );
}