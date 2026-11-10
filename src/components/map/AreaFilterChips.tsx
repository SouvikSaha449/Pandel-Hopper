import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { AREAS } from '@/constants/areas';
import { AREA_KEYS } from '@/constants/areas';
import { useTranslation } from 'react-i18next';

interface AreaFilterChipsProps {
  selectedArea: string;
  onSelectArea: (area: string) => void;
}

export function AreaFilterChips({ selectedArea, onSelectArea }: AreaFilterChipsProps) {
  const colors = useTheme();
  const FILTER_KEYS = ['all', ...AREA_KEYS] as const
  const {t} = useTranslation()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsScroll}
    >
      {FILTER_KEYS.map((key) => {
        const isSelected = selectedArea === key;
        const label = key === 'all' ? t('notices.all') : t(`map.areas.${key}`);

        return (
          <Pressable
            key={key}
            onPress={() => onSelectArea(isSelected ? 'all' : key)}
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
              {label}
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