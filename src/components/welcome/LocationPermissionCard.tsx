import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';

export function LocationPermissionCard() {
  const colors = useTheme();
  const { t } = useTranslation();
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    async function checkPermission() {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status === 'granted') {
          setLocationGranted(true);
        }
      } catch (e) {
        console.warn('Could not check location permission', e);
      }
    }
    checkPermission();
  }, []);

  async function handleAllowLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationGranted(true);
      }
    } catch (e) {
      console.warn('Could not request location permission', e);
    }
  }

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      <View style={styles.locationRow}>
        <View style={[styles.pinCircle, { backgroundColor: colors.accentBg }]}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill={colors.accent}
            />
          </Svg>
        </View>

        <View style={styles.locationInfo}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {t('welcome.showNear')}
          </Text>
          <Text style={[styles.locationSub, { color: colors.textMuted }]}>
            {t('welcome.locationNote')}
          </Text>
        </View>

        {!locationGranted ? (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            onPress={handleAllowLocation}
            style={[styles.allowBtn, { backgroundColor: colors.accentBg }]}
          >
            <Text style={[styles.allowBtnText, { color: colors.accent }]}>
              {t('welcome.allow')}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.allowBtn, { backgroundColor: '#1C3829' }]}>
            <Text style={[styles.allowBtnText, { color: '#4ADE80' }]}>
              {t('welcome.on')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
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
});