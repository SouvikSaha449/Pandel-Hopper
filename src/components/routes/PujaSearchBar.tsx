import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';

interface PujaSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export function PujaSearchBar({
  value,
  onChangeText,
  onFocus,
  placeholder = 'Search by pandal or area...',
}: PujaSearchBarProps) {
  const colors = useTheme();

  return (
    <View
      style={[
        styles.searchBar,
        { backgroundColor: colors.bg, borderColor: colors.cardBorder },
      ]}
    >
      <Ionicons name="search-outline" size={18} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.searchInput, { color: colors.text }]}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
});