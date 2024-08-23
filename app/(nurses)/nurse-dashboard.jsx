import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import CustomButtons from '../../components/CustomButtons'
import { useFormik } from 'formik';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider'
import { logoutUser } from '../../lib/appwrite'

const NurseDashboard = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const formik = useFormik({
    initialValues: {},

    onSubmit: async() => {
      try{
        // Logout the user by deleting the current session
        await logoutUser()

        // Clear the user state and set isLoggedIn to false
        setUser(null);
        setIsLoggedIn(false);

        // Redirect to the login screen
        router.replace('/sign-in');

      }catch(error){
        console.error("Error logging out", error)
      }
    }
  })

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>

        <View className="w-full min-h-[85vh] px-8 mt-32">
          <Image 
            source={images.logo}
            className="w-[200px]"
            resizeMode='contain'
          />

          <Text>welcome back name of nurse</Text>

          <CustomButtons 
            title="logout"
            handlePress={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NurseDashboard