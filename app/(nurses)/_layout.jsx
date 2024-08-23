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

const NurseLayout = () => {
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
        name="nurse-dashboard"
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
        name="nurse-bookings"
        options={{ 
          title: 'Bookings',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.bookings}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="nurse-chat"
        options={{ 
          title: 'Chats',
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
        name="nurse-settings"
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

export default NurseLayout