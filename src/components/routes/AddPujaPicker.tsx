import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { pujaName, pujas } from '@/data/pujas';
import { useTranslation } from '@/i18n';
import { usePrefs } from '@/store/prefs';

interface AddPujaPickerProps {
    existingStopIds: string[];
    onAddPuja: (pujaId: string) => void;
}

export function AddPujaPicker({ existingStopIds, onAddPuja }: AddPujaPickerProps) {
    const colors = useTheme();
    const { t } = useTranslation();
    const lang = usePrefs((s) => s.lang);
    const [query, setQuery] = useState('');

    const availablePujas = useMemo(() => {
        const trimmed = query.trim().toLowerCase()
        const existingSet = new Set(existingStopIds)

        return pujas.filter((p) => {
            if (existingSet.has(p.id)) {
                return false
            }
            if (!trimmed) {
                return true
            }
            const nameInLang = pujaName(p, lang).toLowerCase();
            const nameInEn = p.name.en.toLowerCase()

            return nameInLang.includes(trimmed) || nameInEn.includes(trimmed)
        });
    }, [existingStopIds, query, lang])

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                {t('routes.addPuja').toUpperCase()}
            </Text>
            <View
                style={[
                    styles.searchBar,
                    { backgroundColor: colors.card, borderColor: colors.cardBorder },
                ]}
            >
                <Ionicons name="search-outline" size={18} color={colors.textMuted} />
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search pandals to add..."
                    placeholderTextColor={colors.textMuted}
                    style={[styles.searchInput, { color: colors.text }]}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {query.length > 0 ? (
                    <Pressable onPress={() => setQuery('')} hitSlop={8}>
                        <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                    </Pressable>
                ) : null}
            </View>
            <View style={styles.chipsContainer}>
                {availablePujas.slice(0, 20).map((p) => (
                    <Pressable
                        key={p.id}
                        accessibilityRole="button"
                        onPress={() => onAddPuja(p.id)}
                        style={({ pressed }) => [
                            styles.chip,
                            {
                                backgroundColor: colors.card,
                                borderColor: colors.cardBorder,
                                opacity: pressed ? 0.75 : 1,
                            },
                        ]}
                    >
                        <Ionicons name="add" size={14} color={colors.accent} />
                        <Text style={[styles.chipText, { color: colors.text }]}>
                            {pujaName(p, lang)}
                        </Text>
                    </Pressable>
                ))}
                {availablePujas.length === 0 ? (
                    <Text style={[styles.emptyHint, { color: colors.textMuted }]}>
                        No pandals matching "{query}"
                    </Text>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyHint: {
    fontSize: 13,
    fontStyle: 'italic',
    paddingVertical: 8,
  },
});