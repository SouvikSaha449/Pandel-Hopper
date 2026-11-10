import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { LANGS, setLanguage } from '@/i18n';
import { usePrefs } from '@/store/prefs';

export function LanguageSelector() {
  const colors = useTheme();
  const language = usePrefs((s) => s.lang);

  return (
    <View style={[styles.container, { backgroundColor: colors.track }]}>
      {LANGS.map((item) => {
        const active = language === item.code;
        return (
          <TouchableOpacity
            key={item.code}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            activeOpacity={0.8}
            onPress={() => setLanguage(item.code)}
            style={[
              styles.pill,
              active && { backgroundColor: colors.accent },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? '#FFFFFF' : colors.textMuted },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 3,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});