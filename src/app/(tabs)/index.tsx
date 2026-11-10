import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';
import { AreaFilterChips } from '@/components/map/AreaFilterChips';
import { MapSearchBar } from '@/components/map/MapSearchBar';

export default function MapScreen() {
    const colors = useTheme()
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArea, setSelectedArea] = useState<string>('all');
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
            <View style={[styles.header]}>
                <MapSearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <AreaFilterChips selectedArea={selectedArea} onSelectArea={setSelectedArea} />
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
});