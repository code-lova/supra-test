import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const Speciality = ({ data }) => {
  return (
    <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <View className="px-1">
                <View className="bg-[#44C6A6] w-[170px] mb-4 py-2 rounded-lg flex-col items-center h-[100px] shadow-md">
                <Image 
                    source={item.icon} 
                    className="w-20 h-15"
                    resizeMode="contain" 
                />
                <Text className="text-white px-2 py-2 font-psemibold text-sm">{item.name}</Text>
                </View>
            </View>
           
        )}
        horizontal
    
    />
  )
}

export default Speciality