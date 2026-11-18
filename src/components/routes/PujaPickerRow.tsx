import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/use-theme';
import { pujaName, type Puja } from '@/data/pujas';
import type { Lang } from '@/store/prefs';

interface PujaPickerRowProps {
  puja: Puja;
  isAdded: boolean;
  lang: Lang;
  onAdd: (id: string) => void;
}

export function PujaPickerRow({ puja, isAdded, lang, onAdd }: PujaPickerRowProps) {
  const colors = useTheme();

  const name = pujaName(puja, lang);
  const areaDisplay = puja.area.charAt(0).toUpperCase() + puja.area.slice(1);
  const subtitle = puja.kind ? `${areaDisplay} · ${puja.kind}` : areaDisplay;

  return (
    <View style={[styles.row, { borderBottomColor: colors.cardBorder }]}>
      {/* Leading Location Pin Icon */}
      <View style={[styles.pinCircle, { backgroundColor: colors.accentBg }]}>
        <Ionicons name="location-outline" size={14} color={colors.accent} />
      </View>

      {/* Title & Subtitle */}
      <View style={styles.infoCol}>
        <Text
          style={[styles.name, { color: isAdded ? colors.textMuted : colors.text }]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      </View>

      {/* Action Button: Added ✓ or + Add */}
      {isAdded ? (
        <View style={[styles.addedBadge, { backgroundColor: colors.accentBg, borderColor: colors.cardBorder }]}>
          <Ionicons name="checkmark" size={14} color={colors.accent} />
          <Text style={[styles.addedText, { color: colors.accent }]}>Added</Text>
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={() => onAdd(puja.id)}
          style={({ pressed }) => [
            styles.addBtn,
            { backgroundColor: colors.accent, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Ionicons name="add" size={16} color={colors.bg} />
          <Text style={[styles.addBtnText, { color: colors.bg }]}>Add</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  pinCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  addedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  addedText: {
    fontSize: 12,
    fontWeight: '600',
  },
});