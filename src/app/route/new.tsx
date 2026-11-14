import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getPuja, pujaName } from '@/data/pujas';
import { useNumber } from '@/i18n';
import { usePrefs } from '@/store/prefs';
import { useRouteEditor } from '@/hooks/use-route-editor';
import { AddPujaPicker } from '@/components/routes/AddPujaPicker';
import { RouteEditorBottomBar } from '@/components/routes/RouteEditorBottomBar';
import { RouteEditorPills } from '@/components/routes/RouteEditorPills';
import { StopOrderItem } from '@/components/routes/StopOrderItem';

export default function RouteNewScreen() {
  const editor = useRouteEditor();
  const formatNumber = useNumber();
  const lang = usePrefs((s) => s.lang);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: editor.colors.bg }]}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={editor.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: editor.colors.text }]} numberOfLines={1}>
          {editor.isEditing ? editor.t('routes.customize') : editor.t('routes.newRoute')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={[styles.sectionLabel, { color: editor.colors.textMuted }]}>
          {editor.t('routes.name').toUpperCase()}
        </Text>
        <TextInput
          value={editor.name}
          onChangeText={editor.setName}
          placeholder={editor.t('routes.newRoute')}
          placeholderTextColor={editor.colors.textMuted}
          style={[
            styles.nameInput,
            {
              backgroundColor: editor.colors.card,
              borderColor: editor.colors.cardBorder,
              color: editor.colors.text,
            },
          ]}
        />

        <RouteEditorPills
          stopsCount={editor.stops.length}
          totalMinutes={editor.metrics.totalMinutes}
          km={editor.metrics.km}
        />

        {editor.stops.length >= 3 ? (
          <Pressable
            accessibilityRole="button"
            onPress={editor.optimize}
            style={({ pressed }) => [
              styles.optimizeBtn,
              {
                backgroundColor: editor.colors.accentBg,
                borderColor: editor.colors.accent,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Ionicons name="sparkles" size={16} color={editor.colors.accent} />
            <Text style={[styles.optimizeBtnText, { color: editor.colors.accent }]}>
              {editor.t('routes.optimize')}
            </Text>
          </Pressable>
        ) : null}

        <Text style={[styles.sectionLabel, { color: editor.colors.textMuted, marginTop: 12 }]}>
          {editor.t('complete.yourStops').toUpperCase()} ({formatNumber(editor.stops.length)})
        </Text>

        <View style={styles.stopsList}>
          {editor.stops.map((stopId, index) => {
            const puja = getPuja(stopId);
            if (!puja) return null;
            const metroInfo = puja.metro
              ? `${puja.metro.name} · ${editor.t('common.minWalk', { n: formatNumber(puja.metro.walkMin) })}`
              : undefined;

            return (
              <StopOrderItem
                key={stopId}
                index={index}
                isFirst={index === 0}
                isLast={index === editor.stops.length - 1}
                pujaName={pujaName(puja, lang)}
                subtitle={metroInfo}
                onMoveUp={() => editor.moveUp(index)}
                onMoveDown={() => editor.moveDown(index)}
                onRemove={() => editor.removeStop(index)}
              />
            );
          })}
        </View>

        <AddPujaPicker existingStopIds={editor.stops} onAddPuja={editor.addStop} />
      </ScrollView>

      <RouteEditorBottomBar
        hasStops={editor.stops.length > 0}
        onDone={() => editor.save('draft')}
        onStartRoute={() => editor.save('active')}
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 8,
  },
  nameInput: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  stopsList: {
    marginTop: 4,
  },
  optimizeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 6,
  },
  optimizeBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});