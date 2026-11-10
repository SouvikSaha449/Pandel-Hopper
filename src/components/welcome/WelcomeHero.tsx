import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';

export function WelcomeHero() {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.heroSection}>
      <View style={styles.logoClipper}>
        <Image
          source={require('../../../assets/images/pandel_hopper_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.appName, { color: colors.text }]}>
        {t('appName')}
      </Text>
      <Text style={[styles.tagline, { color: colors.textMuted }]}>
        {t('welcome.tagline')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoClipper: {
    width: 220,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    width: 300,
    height: 300,
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
});