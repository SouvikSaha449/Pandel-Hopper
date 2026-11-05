import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Dark & Light theme palettes matching Durga Puja aesthetics
const THEMES = {
  dark: {
    bg: '#171325',
    card: '#201A30',
    cardBorder: '#2C2442',
    textPrimary: '#FFFFFF',
    textMuted: '#9B90B2',
    accent: '#FF7A5C', // Vibrant festival coral
    accentBg: '#352538',
    track: '#2C2540',
    langContainer: '#231C34',
    langInactive: '#A89FBD',
    allowBtnBg: '#35273C',
    allowBtnText: '#FFB2A1',
    continueBtn: '#FF7A5C',
    continueBtnText: '#FFFFFF',
    pinBg: '#321F32',
    pinColor: '#FF7A5C',
  },
  light: {
    bg: '#FBF7F0',
    card: '#FFFFFF',
    cardBorder: '#EFE8DF',
    textPrimary: '#2A1F1A',
    textMuted: '#7D6F67',
    accent: '#C8341F',
    accentBg: '#FCEAE6',
    track: '#EDE5DB',
    langContainer: '#EFE8DF',
    langInactive: '#7D6F67',
    allowBtnBg: '#FCEAE6',
    allowBtnText: '#C8341F',
    continueBtn: '#C8341F',
    continueBtnText: '#FFFFFF',
    pinBg: '#FCEAE6',
    pinColor: '#C8341F',
  },
};

type Language = 'en' | 'bn' | 'hi';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? THEMES.dark : THEMES.light;

  const [language, setLanguage] = useState<Language>('en');
  const [locationGranted, setLocationGranted] = useState(false);

 
  const [progress] = useState(62);
  const [downloaded] = useState(92);
  const [total] = useState(148);

  async function handleAllowLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationGranted(true);
      }
    } catch {
      setLocationGranted(true);
    }
  }

  function handleContinue() {
    router.replace('/(tabs)');
  }

  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'bn' as const, label: 'বাং' },
    { code: 'hi' as const, label: 'हिं' },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      {/* Top Bar with Language Selector */}
      <View style={styles.topBar}>
        <View style={[styles.langContainer, { backgroundColor: colors.langContainer }]}>
          {languages.map((item) => {
            const active = language === item.code;
            return (
              <TouchableOpacity
                key={item.code}
                activeOpacity={0.8}
                onPress={() => setLanguage(item.code)}
                style={[
                  styles.langPill,
                  active && { backgroundColor: colors.accent },
                ]}
              >
                <Text
                  style={[
                    styles.langText,
                    { color: active ? '#FFFFFF' : colors.langInactive },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
           <View style={styles.logoClipper}>
          <Image
            source={require('../../assets/images/pandel_hopper_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.appName, { color: colors.textPrimary }]}>
          Pandal Hopper
        </Text>
        <Text style={[styles.tagline, { color: colors.textMuted }]}>
          Plan your Durga Puja route. Works offline.
        </Text>
      </View>

      {/* Card 1: Offline Map Download Progress */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.cardBorder },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            Downloading Kolkata map
          </Text>
          <Text style={[styles.percentText, { color: colors.accent }]}>
            {progress}%
          </Text>
        </View>

        <View style={[styles.progressTrack, { backgroundColor: colors.track }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: colors.accent },
            ]}
          />
        </View>

        <View style={styles.cardFooter}>
          <Text style={[styles.subText, { color: colors.textMuted }]}>
            {downloaded} of {total} MB
          </Text>
          <Text style={[styles.subText, { color: colors.textMuted }]}>
            Wi-Fi recommended
          </Text>
        </View>
      </View>

      {/* Card 2: Location Permission */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.cardBorder },
        ]}
      >
        <View style={styles.locationRow}>
          {/* Location Pin Icon */}
          <View style={[styles.pinCircle, { backgroundColor: colors.pinBg }]}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill={colors.pinColor}
              />
            </Svg>
          </View>

          {/* Location Description */}
          <View style={styles.locationInfo}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
              Show pujas near you
            </Text>
            <Text style={[styles.locationSub, { color: colors.textMuted }]}>
              Location is used only on your phone
            </Text>
          </View>

          {/* Action Button */}
          {!locationGranted ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAllowLocation}
              style={[styles.allowBtn, { backgroundColor: colors.allowBtnBg }]}
            >
              <Text style={[styles.allowBtnText, { color: colors.allowBtnText }]}>
                Allow
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.allowBtn, { backgroundColor: '#1C3829' }]}>
              <Text style={[styles.allowBtnText, { color: '#4ADE80' }]}>
                ✓ On
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Primary Continue Button */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleContinue}
        style={[styles.continueBtn, { backgroundColor: colors.continueBtn }]}
      >
        <Text style={[styles.continueBtnText, { color: colors.continueBtnText }]}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 36,
  },
  topBar: {
    alignItems: 'flex-end',
    marginBottom: 0,  
  },
  langContainer: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 3,
  },
  langPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  langText: {
    fontSize: 13,
    fontWeight: '700',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 25,
  },
    logoClipper: {
    width: 220,
    height: 180, 
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 30,
    marginBottom:30,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 0,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  percentText: {
    fontSize: 16,
    fontWeight: '800',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subText: {
    fontSize: 13,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  pinCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationSub: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  allowBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },
  allowBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  continueBtn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#FF7A5C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});