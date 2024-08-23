import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowpassword] = useState(false);



  return (
    <View className={`space-y-0 ${otherStyles}`}>
      <Text className="text-blackgray-100 font-psemibold">{title}</Text>

      <View className="w-full h-14 px-4 bg-white border-2 border-secondary rounded-2xl focus:border-customgreen items-center flex-row">
        <TextInput
            className="flex-1 text-blackgray-200 font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            secureTextEntry={placeholder === 'Password' && !showPassword}
        />

        {placeholder === 'Password' && (
          <TouchableOpacity onPress={() => setShowpassword(!showPassword)}>
            <Image 
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode='contain'
            />
          </TouchableOpacity>

        )}
      </View>

        
    </View>
  )
}

export default FormField