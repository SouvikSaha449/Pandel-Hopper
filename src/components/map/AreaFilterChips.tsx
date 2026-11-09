import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { AREAS } from '@/constants/areas';

interface AreaFilterChipsProps {
  selectedArea: string;
  onSelectArea: (area: string) => void;
}

export function AreaFilterChips({ selectedArea, onSelectArea }: AreaFilterChipsProps) {
  const colors = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsScroll}
    >
      {AREAS.map((area) => {
        const isSelected = selectedArea === area;
        return (
          <Pressable
            key={area}
            onPress={() => onSelectArea(isSelected ? 'All' : area)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? colors.accent : colors.card,
                borderColor: isSelected ? colors.accent : colors.cardBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: isSelected ? '#FFFFFF' : colors.text },
              ]}
            >
              {area}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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