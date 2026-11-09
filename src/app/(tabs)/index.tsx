import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { AREAS } from '@/constants/areas';

export default function MapScreen() {
    const colors = useTheme()
    const [isFocused, setIsFocused] = useState(false);
    const [selectedArea, setSelectedArea] = useState<String>('All');
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
            <View style={[styles.header]}>
                <View style={[styles.searchPill, { backgroundColor: colors.card, borderColor: colors.cardBorder },]}>
                    <Ionicons name='search' size={20} color={colors.textMuted} />
                    <TextInput
                        placeholder={isFocused ? '' : 'Search pandals, areas, metro...'}
                        placeholderTextColor={colors.textMuted}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={[styles.searchInput, { color: colors.text }]}
                    />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
                    {AREAS.map((area) => {
                        const isSelected = selectedArea === area;
                        return (
                            <Pressable key={area} onPress={() => {
                                setSelectedArea(isSelected ? 'All' : area)
                            }}
                                style={[styles.chip, {
                                    backgroundColor: isSelected ? colors.accent : colors.card,
                                    borderColor: isSelected ? colors.accent : colors.cardBorder,
                                },]}>
                                <Text style={[styles.chipText, { color: isSelected ? '#FFFFFF' : colors.text }]}>{area}</Text>
                            </Pressable>
                        )
                    })}
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    searchPill: {
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500'
    },
    chipsScroll: {
        paddingTop: 12,
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
    },
});