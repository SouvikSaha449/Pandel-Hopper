import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getPuja, pujaName } from '@/data/pujas';
import { walkMinutes } from '@/data/geo';
import { usePrefs } from '@/store/prefs';
import { useRouteEditor } from '@/hooks/use-route-editor';
import { AddPujaSheet } from '@/components/routes/AddPujaSheet';
import { RouteEditorBottomBar } from '@/components/routes/RouteEditorBottomBar';
import { StopConnector } from '@/components/routes/StopConnector';
import { StopOrderItem } from '@/components/routes/StopOrderItem';
import { HeaderActionButton } from '@/components/ui/HeaderActionButton';

export default function RouteNewScreen() {
  const editor = useRouteEditor();
  const lang = usePrefs((s) => s.lang);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: editor.colors.bg }]}>

      <View style={styles.header}>

        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={editor.colors.text} />
        </Pressable>

        <Text style={[styles.headerTitle, { color: editor.colors.text }]} numberOfLines={1}>
          {editor.isEditing ? editor.t('routes.customize') : editor.t('routes.newRoute')}
        </Text>

        <HeaderActionButton 
        label='Save' 
        onPress={()=>editor.save('draft')} 
        disabled={editor.stops.length === 0} 
        />

      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        <View
          style={[
            styles.nameCard,
            { backgroundColor: editor.colors.card, borderColor: editor.colors.cardBorder },
          ]}
        >
          <TextInput
            value={editor.name}
            onChangeText={editor.setName}
            placeholder={editor.t('routes.newRoute')}
            placeholderTextColor={editor.colors.textMuted}
            style={[styles.nameInput, { color: editor.colors.text }]}
          />
          <Text style={[styles.nameLabel, { color: editor.colors.textMuted }]}>
            {editor.t('routes.name')}
          </Text>
        </View>

        <View style={styles.stopsList}>
          {editor.stops.map((stopId, index) => {
            const puja = getPuja(stopId);
            if (!puja) return null;

            const prevPuja = index > 0 ? getPuja(editor.stops[index - 1]) : null;
            const walkMin = prevPuja ? walkMinutes(prevPuja.loc, puja.loc) : 0;

            return (
              <View key={stopId}>

                {index > 0 && walkMin > 0 ? (
                  <StopConnector walkMinutes={walkMin} />
                ) : null}

                <StopOrderItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === editor.stops.length - 1}
                  pujaName={pujaName(puja, lang)}
                  onMoveUp={() => editor.moveUp(index)}
                  onMoveDown={() => editor.moveDown(index)}
                  onRemove={() => editor.removeStop(index)}
                />
              </View>
            );
          })}
        </View>

                <Pressable
          accessibilityRole="button"
          onPress={() => setIsSheetOpen(true)}
          style={({ pressed }) => [
            styles.addPujaBtn,
            {
              borderColor: editor.colors.accent,
              backgroundColor: editor.colors.card,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Ionicons name="add" size={20} color={editor.colors.accent} />
          <Text style={[styles.addPujaBtnText, { color: editor.colors.accent }]}>
            {editor.t('routes.addPuja')}
          </Text>
        </Pressable>

        <AddPujaSheet
          visible={isSheetOpen}
          existingStopIds={editor.stops}
          onAddPuja={editor.addStop}
          onClose={() => setIsSheetOpen(false)}
        />
      </ScrollView>

      <RouteEditorBottomBar
        stopsCount={editor.stops.length}
        totalMinutes={editor.metrics.totalMinutes}
        km={editor.metrics.km}
        canOptimize={editor.stops.length >= 3}
        onOptimize={editor.optimize}
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
    gap: 8,
  },
  backBtn: {
    padding: 6,
    marginLeft: -6,
  },
  headerTitle: {
    flex:1,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  nameCard: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  nameInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  nameLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
  },
  stopsList: {
    marginBottom: 4,
  },
    addPujaBtn: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  addPujaBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});