import { useMemo, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { useBottomSheetPan } from '@/hooks/use-bottom-sheet-pan';
import { searchPujas } from '@/data/pujas';
import { useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';
import { HeaderActionButton } from '@/components/ui/HeaderActionButton';
import { PujaPickerRow } from './PujaPickerRow';
import { PujaSearchBar } from './PujaSearchBar';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SNAP_HALF = Math.round(SCREEN_HEIGHT * 0.52);
const SNAP_FULL = Math.round(SCREEN_HEIGHT * 0.90);

interface AddPujaSheetProps {
  visible: boolean;
  existingStopIds: string[];
  onAddPuja: (pujaId: string) => void;
  onClose: () => void;
}

export function AddPujaSheet({
  visible,
  existingStopIds,
  onAddPuja,
  onClose,
}: AddPujaSheetProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const lang = usePrefs((s) => s.lang);
  const [query, setQuery] = useState('');

  const { sheetHeight, panHandlers, snapTo, resetToHalf } = useBottomSheetPan({
    snapHalf: SNAP_HALF,
    snapFull: SNAP_FULL,
    onDismiss: onClose,
  });

  const availablePujas = useMemo(() => searchPujas(query, lang), [query, lang]);

  const handleClose = () => {
    setQuery('');
    resetToHalf();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

        <Animated.View
          style={[
            styles.sheet,
            {
              height: sheetHeight,
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View {...panHandlers} style={styles.handleArea}>
            <View style={[styles.handlePill, { backgroundColor: colors.cardBorder }]} />
          </View>

          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('routes.addPuja')}
            </Text>
            <HeaderActionButton label="Done" onPress={handleClose} />
          </View>

          <PujaSearchBar
            value={query}
            onChangeText={setQuery}
            onFocus={() => snapTo('full')}
          />


          <FlatList
            data={availablePujas}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                  No pandals matching "{query}"
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <PujaPickerRow
                puja={item}
                isAdded={existingStopIds.includes(item.id)}
                lang={lang}
                onAdd={onAddPuja}
              />
            )}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    overflow: 'hidden',
    paddingBottom: 24,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handlePill: {
    width: 38,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});