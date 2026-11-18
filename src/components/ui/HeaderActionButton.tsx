import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface HeaderActionButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string; 
}

export function HeaderActionButton({
  label,
  onPress,
  disabled = false,
  color,
}: HeaderActionButtonProps){
    const colors = useTheme();
     return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        styles.btn,
        { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: disabled ? colors.textMuted : color ?? colors.accent },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});

