import { View, Text, Image } from 'react-native';
import React from 'react';
import images from '../constants/images';
import icons from '../constants/icons';

const NursesCard = ({ nursecard: { name, specialties, lastActive, gender } }) => {
  return (
    <View className="flex-col items-center px-4 mb-2">
        <View className="bg-[#c4f0df] w-full px-1 py-1 rounded-lg">
            <View className="flex-row gap-3 items-start justify-between -top-2">

                <View className="flex-row gap-3 items-start">
                    <View>
                        <Image
                            source={gender === 'female' ? images.female_thumbnail : images.male_thumbnail}
                            className="w-16 h-20 rounded-xl"
                            resizeMode="contain"
                        />
                    </View>
                   
                    <View>
                        <Text className="text-lg font-psemibold text-blackgray-100">{name}</Text>
                        <Text className="py-1 text-blackgray-100">{specialties}</Text>
                        <Text className="py-1 text-blackgray-100">
                            {gender}
                            <Text className="text-xs"> ⭐⭐⭐⭐</Text> {/* Placeholder for star ratings */}
                        </Text>
                    </View>
                </View>

                <View className="pt-4">
                    <Image
                        source={icons.menui}
                        resizeMode="contain"
                        className="w-5 h-5"
                    />
                </View>

            </View>
        </View>
    </View>
  );
}

export default NursesCard;
