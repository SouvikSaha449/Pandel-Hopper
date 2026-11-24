import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  SavedEmptyState,
  SavedPujasTab,
  SavedRoutesTab,
  SavedSegmentTabs,
  type SavedTabType,
} from '@/components/saved';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { getPuja, type Puja } from '@/data/pujas';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';
import { useRoutesStore } from '@/store/routes';

export default function SavedScreen() {
  const colors = useTheme();
  const { t } = useTranslation();
  const lang = usePrefs((s) => s.lang);

  const [activeTab, setActiveTab] = useState<SavedTabType>('pujas');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const favourites = usePrefs((s) => s.favourites);
  const savedRoutes = usePrefs((s) => s.savedRoutes);
  const toggleFavourite = usePrefs((s) => s.toggleFavourite);
  const clearFavourites = usePrefs((s) => s.clearFavourites);

  const customRoutes = useRoutesStore((s) => s.customRoutes);
  const activeRoute = useRoutesStore((s) => s.active);

  const displayCustomRoutes = useMemo(
    () => customRoutes.filter((r) => r.id !== activeRoute?.routeId),
    [customRoutes, activeRoute]
  );

  const favouritePujas = useMemo(() => {
    return favourites
      .map(getPuja)
      .filter((p): p is Puja => Boolean(p));
  }, [favourites]);

  const totalRoutesCount = savedRoutes.length + displayCustomRoutes.length;
  const isCompletelyEmpty = favouritePujas.length === 0 && totalRoutesCount === 0;

  const handleMakeRoute = () => {

    router.push({ pathname: '/route/new', params: { fav: '1' } });
  };

  const handleConfirmClear = () => {
    clearFavourites();
    setShowClearConfirm(false);
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.bg }]}>

      <View style={styles.header}>
        <Text style={[styles.largeTitle, { color: colors.text }]}>
          {t('saved.title')}
        </Text>
      </View>

      <SavedSegmentTabs
        activeTab={activeTab}
        onSelect={setActiveTab}
        pujasCount={favouritePujas.length}
        routesCount={totalRoutesCount}
      />

      {isCompletelyEmpty ? (
        <SavedEmptyState type={activeTab} />
      ) : activeTab === 'pujas' ? (
        <SavedPujasTab
          pujas={favouritePujas}
          onToggleFavourite={toggleFavourite}
          onMakeRoute={handleMakeRoute}
          onRequestClearAll={() => setShowClearConfirm(true)}
        />
      ) : (
        <SavedRoutesTab
          savedRoutes={savedRoutes}
          customRoutes={displayCustomRoutes}
          lang={lang}
        />
      )}

      <ConfirmDialog
        visible={showClearConfirm}
        title={t('saved.clearConfirmTitle')}
        message={t('saved.clearConfirmMessage')}
        confirmLabel={t('common.clear')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleConfirmClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  largeTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});