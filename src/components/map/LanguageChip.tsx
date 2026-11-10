import { Pressable,Text,StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { LANGS,nextLang,setLanguage } from "@/i18n";
import { usePrefs } from "@/store/prefs";

export function LanguageChip(){
    const colors = useTheme();
    const lang = usePrefs((s) => s.lang);
    const currentLabel = LANGS.find((item)=> item.code === lang)?.chip ?? 'EN'; 

    return(
        <Pressable 
        accessibilityRole="button"
        accessibilityLabel={`Language: ${currentLabel}, Tap to change`}
        onPress={() => setLanguage(nextLang(lang))}
                style={({ pressed }) => [
          styles.chip,
          {
            backgroundColor: colors.accentBg,
            opacity: pressed ? 0.75 : 1,
          },
        ]}>
        <Text style={[styles.label, { color: colors.accent }]}>{currentLabel}</Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});