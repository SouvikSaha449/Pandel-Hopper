import { Tabs } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useTheme } from '@/hooks/use-theme'
import { useTranslation } from '@/i18n';

export default function TabLayout() {
  const { t } = useTranslation();
    const colors = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: [
            styles.tabBar,
            {backgroundColor:colors.tabBar , borderTopColor:colors.border,}
        ],
        tabBarLabelStyle : styles.tabBarLabel
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title:  t('tab.map'),
          tabBarIcon: ({ color,focused }) => <Ionicons name ={focused? 'map' : 'map-outline'} size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: t('tab.routes'),
          tabBarIcon: ({ color,focused }) => <Ionicons name = {focused ? 'navigate' : 'navigate-outline'} size = {24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: t('tab.saved'),
          tabBarIcon: ({ color,focused }) => <Ionicons name ={focused? 'bookmark' : 'bookmark-outline'} size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title:  t('tab.settings'),
          tabBarIcon: ({ color,focused }) => <Ionicons name ={focused? 'settings' : 'settings-outline'} size={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 86 : 66,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    paddingTop: 8,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});