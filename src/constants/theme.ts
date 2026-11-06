export const Colors = {
  dark: {
    bg: '#171325',
    card: '#201A30',
    cardBorder: '#2C2442',
    border: '#261F38',
    text: '#FFFFFF',
    textMuted: '#9B90B2',
    accent: '#FF7A5C', // Vibrant festival coral
    accentBg: '#352538',
    tabBar: '#171325',
    tabInactive: '#7E7495',
    track: '#2C2540',
    // Pandal Pin States
    pinUnvisited: '#FF7A5C',
    pinVisited: '#2ECC71',
    pinSaved: '#F5A623',
    pinClosed: '#9E9E9E',
  },
  light: {
    bg: '#FBF7F0',
    card: '#FFFFFF',
    cardBorder: '#EFE8DF',
    border: '#EDE5DC',
    text: '#2A1F1A',
    textMuted: '#7D6F67',
    accent: '#C8341F', // Deep heritage red
    accentBg: '#FCEAE6',
    tabBar: '#FFFFFF',
    tabInactive: '#8A7B73',
    track: '#EDE5DB',
    // Pandal Pin States
    pinUnvisited: '#C8341F',
    pinVisited: '#2ECC71',
    pinSaved: '#F5A623',
    pinClosed: '#9E9E9E',
  },
} as const;

export type ThemeColors = typeof Colors.light;