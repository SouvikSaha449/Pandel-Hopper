import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { WelcomeHero } from '@/components/welcome/WelcomeHero';
import { MapDownloadCard } from '@/components/welcome/MapDownloadCard';
import { LocationPermissionCard } from '@/components/welcome/LocationPermissionCard';

export default function WelcomeScreen() {
  const colors = useTheme();
  const { t } = useTranslation();

  function handleContinue() {
    router.replace('/(tabs)' as any);
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={styles.topBar}>
        <LanguageSelector />
      </View>

      <WelcomeHero />
      <MapDownloadCard progress={62} downloaded={92} total={148} />
      <LocationPermissionCard />

      <View style={{ flex: 1 }} />

      <PrimaryButton
        label={t('common.continue')}
        onPress={handleContinue}
      />
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
  },
});