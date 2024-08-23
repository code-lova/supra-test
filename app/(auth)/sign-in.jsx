import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
import { loginUser, getCurrentUserRoleFromPrefs } from '../../lib/appwrite';
import CustomButtons from '../../components/CustomButtons';

const SignIn = () => {

  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const session = await loginUser(values.email, values.password);

        // Fetch user data after successful login
        const user = await getCurrentUserRoleFromPrefs();

        // Check user role and navigate accordingly
        if (user.prefs.role === 'client') {
          router.replace('/client-dashboard'); // Navigate to client dashboard
        } else if (user.prefs.role === 'nurse') {
          router.replace('/nurse-dashboard'); // Navigate to nurse dashboard
        } else {
          Alert.alert('Login Failed', 'No valid role found for this user.');
        }

        Alert.alert('Login Successful', `Welcome Back..${user.name}!`);
        
      } catch (error) {
        Alert.alert('login Failed', error.message || 'Something went wrong');
      } finally {
        setSubmitting(false);
      }
    },
  });

  

  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={{ height: '100%' }}>
      <View className="w-full min-h-[85vh] px-8 mt-32">

        <Image 
            source={images.logo}
            className="w-[200px]"
            resizeMode='contain'
        />
        <Text className="text-lg font-psemibold text-headingcolor uppercase mt-2">Login into Your Account</Text>
          <FormField 
            title="Email"
            value={formik.values.email}
            handleChangeText={formik.handleChange('email')}
            otherStyles="mt-5"
            keyBoardType="email-address"
            placeholder="Enter Your Email Address"
            onBlur={formik.handleBlur('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text className="text-red-500 text-sm mt-1">{formik.errors.email}</Text>
          ) : null}

          <FormField 
            title="Password"
            value={formik.values.password}
            handleChangeText={formik.handleChange('password')}
            otherStyles="mt-5"
            placeholder="Enter your Password"
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text className="text-red-500 text-sm mt-1">{formik.errors.password}</Text>
          ) : null}

          <View className="mt-8">
            <CustomButtons
              title={formik.isSubmitting ? 'Processing...' : 'Sign In'}
              handlePress={formik.handleSubmit}
              isLoading={formik.isSubmitting}
            />

            <View className="flex flex-row justify-center pt-8 space-x-2">
              <Text className="font-psemibold text-base text-blackgray-100">
                Already have an account?
              </Text>
              <Link href="/sign-up" className="text-base text-headingcolor font-bold">Sign Up</Link>
            </View>
          </View>


      </View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default SignIn