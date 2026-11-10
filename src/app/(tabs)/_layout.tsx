import { Tabs } from 'expo-router';
import { StyleSheet, Platform, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { useTheme } from '@/hooks/use-theme'
import { useTranslation } from '@/i18n';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name']

function TabIcon({
  name,
  focused,
  color,
  accentBg,
}: {
  name: IconName;
  focused: boolean;
  color: string;
  accentBg: string;
}) {
  return (
    <View
      style={{
        width: 56,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? accentBg : 'transparent',
      }}
    >
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();
  const colors = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          height: 64 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
        },
        tabBarLabelStyle : styles.tabBarLabel
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.map'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={focused ? 'map' : 'map-outline'}
              focused={focused}
              color={color as string}
              accentBg={colors.accentBg}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="routes"
        options={{
          title: t('tab.routes'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={focused ? 'navigate' : 'navigate-outline'}
              focused={focused}
              color={color as string}
              accentBg={colors.accentBg}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: t('tab.saved'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={focused ? 'bookmark' : 'bookmark-outline'}
              focused={focused}
              color={color as string}
              accentBg={colors.accentBg}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: t('tab.settings'),
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={focused ? 'settings' : 'settings-outline'}
              focused={focused}
              color={color as string}
              accentBg={colors.accentBg}
            />
          ),
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