import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
<<<<<<< HEAD
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'transparent', // Set the background to transparent
        position: 'absolute', // This makes sure the background is fully transparent
        borderTopWidth: 0, // Removes the border line at the top of the tab bar
        elevation: 0, // Removes the shadow on Android
      },
    }}>
=======
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
>>>>>>> e08c9f48163d1d98e9f366b18d3e8fcd79f29275
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
<<<<<<< HEAD
      {/* <Tabs.Screen
=======
      <Tabs.Screen
>>>>>>> e08c9f48163d1d98e9f366b18d3e8fcd79f29275
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
<<<<<<< HEAD
      /> */}
=======
      />
>>>>>>> e08c9f48163d1d98e9f366b18d3e8fcd79f29275
    </Tabs>
  );
}
