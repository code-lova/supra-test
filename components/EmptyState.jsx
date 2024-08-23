import { View, Text, Image } from 'react-native'
import React from 'react';
import icons from '../constants/icons';
import CustomButtons from './CustomButtons';
import { router } from 'expo-router';


const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image 
          source={icons.empty}
          className="w-[200px] h-[150px]"
          resizeMode='contain'
      />
      <Text className="text-blackgray-100 font-psemibold text-center mt-2 text-xl">{title}</Text>

      <Text className="font-pmedium text-sm text-headingcolor uppercase">{subTitle}</Text>

      <CustomButtons 
          title="Explore Finder"
          handlePress={() => router.push('/finder')}
          containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState