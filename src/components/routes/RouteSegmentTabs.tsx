import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';

export type RouteSegment = 'ready' | 'custom' | 'history';

const SEGMENTS: { key: RouteSegment; labelKey: string }[] = [
  { key: 'ready', labelKey: 'routes.readyMade' },
  { key: 'custom', labelKey: 'routes.myRoutes' },
  { key: 'history', labelKey: 'routes.history' },
];

interface RouteSegmentTabsProps {
  selected: RouteSegment;
  onSelect: (segment: RouteSegment) => void;
}

export function RouteSegmentTabs({ selected, onSelect }: RouteSegmentTabsProps) {
  const { t } = useTranslation();
  const colors = useTheme();
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.row} accessibilityRole="tablist">
      {SEGMENTS.map((item) => {
        const isSelected = selected === item.key;

        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(item.key)}
            style={[
              styles.pill,
              {
                backgroundColor: isSelected ? colors.accent : colors.card,
                borderColor: isSelected ? colors.accent : colors.cardBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isSelected
                    ? isDark
                      ? colors.bg
                      : '#FFFFFF'
                    : colors.text,
                },
              ]}
            >
              {t(item.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});