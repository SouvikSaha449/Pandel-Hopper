import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from 'react-i18next';

interface RouteNameInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function RouteNameInput({ value, onChangeText }: RouteNameInputProps) {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.nameCard,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={t('routes.newRoute')}
        placeholderTextColor={colors.textMuted}
        style={[styles.nameInput, { color: colors.text }]}
      />
      <Text style={[styles.nameLabel, { color: colors.textMuted }]}>
        {t('routes.name')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nameCard: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
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
});