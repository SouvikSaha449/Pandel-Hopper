import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface ConfirmDialogProps {
    visible: boolean;
    title: string;
    message: string;
    cancelLabel: string;
    confirmLabel: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export function ConfirmDialog({
    visible,
    title,
    message,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) {
    const colors = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            statusBarTranslucent
            onRequestClose={onCancel}
        >
            <Pressable style={styles.backdrop} onPress={onCancel}>
                <Pressable style={[
                    styles.dialog,
                    { backgroundColor: colors.card, borderColor: colors.cardBorder },
                ]}
                    onPress={() => { }}
                >
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>
                    <View style={styles.buttonRow}>
                        <Pressable
                            accessibilityRole="button"
                            onPress={onCancel}
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
                                {cancelLabel}
                            </Text>
                        </Pressable>
                        <Pressable
                            accessibilityRole="button"
                            onPress={onConfirm}
                            style={({ pressed }) => [
                                styles.btn,
                                {
                                    backgroundColor: colors.accent,
                                    opacity: pressed ? 0.8 : 1,
                                },
                            ]}
                        >
                            <Text style={[styles.btnText, { color: colors.bg }]}>
                                {confirmLabel}
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
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
        lineHeight: 20,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    btn: {
        flex: 1,
        height: 46,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 15,
        fontWeight: '700',
    },
});