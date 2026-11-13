import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { CustomRoutesTab } from '@/components/routes/CustomRoutesTab';
import { HistoryTab } from '@/components/routes/HistoryTab';
import { ReadyMadeTab } from '@/components/routes/ReadyMadeTab';
import { RouteSegmentTabs, type RouteSegment } from '@/components/routes/RouteSegmentTabs';

export default function RoutesScreen() {
  const colors = useTheme();
  const { t } = useTranslation();
  const [segment, setSegment] = useState<RouteSegment>('ready');

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{t('routes.title')}</Text>
        <RouteSegmentTabs selected={segment} onSelect={setSegment} />
      </View>

      {segment === 'ready' && <ReadyMadeTab />}
      {segment === 'custom' && <CustomRoutesTab />}
      {segment === 'history' && <HistoryTab />}
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
});