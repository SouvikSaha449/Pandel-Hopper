import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRouteEditor } from '@/hooks/use-route-editor';
import { HeaderActionButton } from '@/components/ui/HeaderActionButton';
import {
  AddPujaSheet,
  RouteEditableStopList,
  RouteEditorBottomBar,
  RouteNameInput,
  StopActionDialog,
} from '@/components/routes';;
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function RouteNewScreen() {
  const editor = useRouteEditor();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeStop, setActiveStop] = useState<{ index: number; name: string } | null>(null);

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
          label={editor.t('common.save')}
          onPress={() => editor.save('draft')}
          disabled={editor.stops.length === 0}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <RouteNameInput value={editor.name} onChangeText={editor.setName} />

        <RouteEditableStopList
          editor={editor}
          onStopPress={(index, name) => setActiveStop({ index, name })}
          onOpenAddSheet={() => setIsSheetOpen(true)}
        />

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

      <StopActionDialog
        visible={activeStop !== null}
        stopName={activeStop?.name ?? ''}
        stopIndex={activeStop?.index ?? 0}
        isFirst={activeStop?.index === 0}
        isLast={activeStop?.index === editor.stops.length - 1}
        onSetAsStart={() => activeStop && editor.setAsStart(activeStop.index)}
        onSetAsEnd={() => activeStop && editor.setAsEnd(activeStop.index)}
        onClose={() => setActiveStop(null)}
      />

      <ConfirmDialog
        visible={editor.optimizeResult !== null}
        title={editor.optimizeResult?.title ?? ''}
        message={editor.optimizeResult?.message ?? ''}
        cancelLabel={editor.optimizeResult?.previousStops ? 'Undo' : undefined}
        confirmLabel="OK"
        onCancel={editor.undoOptimize}
        onConfirm={editor.dismissOptimizeResult}
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
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});