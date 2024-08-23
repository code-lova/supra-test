import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons';

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowpassword] = useState(false);



  return (
    
      <View className="w-full h-14 px-4 bg-white border-2 border-secondary rounded-2xl focus:border-customgreen items-center flex-row space-x-4">
        <TextInput
            className="flex-1 text-blackgray-200 font-pregular text-base"
            value={value}
            placeholder="Search for a nurse by name"
            onChangeText={handleChangeText}
            secureTextEntry={placeholder === 'Password' && !showPassword}
        />

        <TouchableOpacity>
            <Image 
                source={icons.search}
                className="w-5 h-5"
                resizeMode='contain'
            />
        </TouchableOpacity>
      </View>

        
  )
}

export default SearchInput;