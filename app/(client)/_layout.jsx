import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import icons from '../../constants/icons'

const TabIcon = ({ icon, color, name, focused}) => {
  return (
      <View className="items-center justify-center gap-1">
          <Image 
              source={icon}
              resizeMode='contain'
              className='w-8 h-8'
              tintColor={color}
          />
          <Text className={` ${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
              {name}
          </Text>
      </View>
  )
}

const ClientLayout = () => {
  return ( 
    <Tabs
      screenOptions={{ 
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#44C6A6',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 9,
            borderTopColor: '#232523',
            height: 84
        }
      }}
    >
      <Tabs.Screen
        name="client-dashboard"
        options={{ 
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="finder"
        options={{ 
          title: 'Finder',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.finder}
              color={color}
              name="Finder"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="client-chat"
        options={{ 
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.chat}
              color={color}
              name="Messages"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="client-settings"
        options={{ 
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.settings}
              color={color}
              name="Settings"
              focused={focused}
            />
          ),
        }}
      />

    </Tabs>
  )
}

export default ClientLayout;