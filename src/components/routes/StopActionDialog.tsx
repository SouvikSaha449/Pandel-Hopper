import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { useNumber, useTranslation } from '@/i18n';

interface StopActionDialogProps {
  visible: boolean;
  stopName: string;
  stopIndex: number;
  isFirst: boolean;
  isLast: boolean;
  onSetAsStart: () => void;
  onSetAsEnd: () => void;
  onClose: () => void;
}

export function StopActionDialog({
  visible,
  stopName,
  stopIndex,
  isFirst,
  isLast,
  onSetAsStart,
  onSetAsEnd,
  onClose,
}: StopActionDialogProps) {
  const colors = useTheme();
  const { t } = useTranslation();
  const formatNumber = useNumber();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.dialog,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
          onPress={() => {}} 
        >

          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {stopName}
          </Text>
          <Text style={[styles.message, { color: colors.textMuted }]}>
            Stop #{formatNumber(stopIndex + 1)} · Choose Route Anchor
          </Text>

          <View style={styles.buttonStack}>
            {!isFirst && (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  onSetAsStart();
                  onClose();
                }}
                style={({ pressed }) => [
                  styles.btn,
                  styles.startBtn,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Ionicons name="flag" size={17} color="#4ADE80" />
                <Text style={[styles.btnText, { color: '#4ADE80' }]}>
                  Set as Starting Point
                </Text>
              </Pressable>
            )}

            {!isLast && (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  onSetAsEnd();
                  onClose();
                }}
                style={({ pressed }) => [
                  styles.btn,
                  styles.endBtn,
                  {
                    backgroundColor: colors.accentBg,
                    borderColor: colors.accent,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Ionicons name="flag" size={17} color={colors.accent} />
                <Text style={[styles.btnText, { color: colors.accent }]}>
                  Set as Ending Point
                </Text>
              </Pressable>
            )}

            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={({ pressed }) => [
                styles.btn,
                {
                  borderColor: colors.cardBorder,
                  borderWidth: 1,
                  opacity: pressed ? 0.75 : 1,
                },
              ]}
            >
              <Text style={[styles.btnText, { color: colors.text }]}>
                {t('common.cancel')}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  dialog: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 4,
  },
  buttonStack: {
    gap: 10,
    marginTop: 4,
  },
  btn: {
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startBtn: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: '#4ADE80',
    borderWidth: 1,
  },
  endBtn: {
    borderWidth: 1,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});