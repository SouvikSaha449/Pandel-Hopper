import { ScrollView, Pressable, Text, StyleSheet,useColorScheme } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
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
  const isDark = useColorScheme() === 'dark';

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
                { color: isSelected ? (isDark ? colors.bg : '#FFFFFF') : colors.text },
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
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
  },
});