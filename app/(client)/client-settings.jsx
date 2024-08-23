import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';

const ClientSettings = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full max-h-[85vh] px-8 mt-10">
        <Text>ClientSettings Screen</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default ClientSettings