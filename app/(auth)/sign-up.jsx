import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButtons';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

       // Pass signup data to the next screen (SelectProfile)
      router.push({
      pathname: '/select-profile',
        params: { ...values },
      });
    },
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView 
        contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[85vh] px-8 mt-6">

          <Image 
            source={images.logo}
            className="w-[200px]"
            resizeMode='contain'
          />

          <Text className="text-lg font-psemibold text-headingcolor uppercase mt-2">Create an account</Text>

          {/* Form Fields with validation errors */}
          <FormField 
            title=""
            value={formik.values.name}
            handleChangeText={formik.handleChange('name')}
            otherStyles="mt-2"
            placeholder="Enter your Full Name"
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text className="text-red-500 text-sm mt-1">{formik.errors.name}</Text>
          ) : null}

          <FormField 
            title=""
            value={formik.values.email}
            handleChangeText={formik.handleChange('email')}
            otherStyles="mt-1"
            keyBoardType="email-address"
            placeholder="Enter Your Email Address"
            onBlur={formik.handleBlur('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text className="text-red-500 text-sm mt-1">{formik.errors.email}</Text>
          ) : null}

          <FormField 
            title=""
            value={formik.values.password}
            handleChangeText={formik.handleChange('password')}
            otherStyles="mt-1"
            placeholder="Password"
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text className="text-red-500 text-sm mt-1">{formik.errors.password}</Text>
          ) : null}

          <FormField 
            title=""
            value={formik.values.confirmpassword}
            handleChangeText={formik.handleChange('confirmpassword')}
            otherStyles="mt-1"
            placeholder="Confirm Password"
            onBlur={formik.handleBlur('confirmpassword')}
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <Text className="text-red-500 text-sm mt-1">{formik.errors.confirmpassword}</Text>
          ) : null}

          {/* Submit Button */}
          <View className="mt-8">
            <CustomButton
              title="Next"
              handlePress={formik.handleSubmit}
              isLoading={formik.isSubmitting}
            />

            <View className="flex flex-row justify-center pt-8 space-x-2">
              <Text className="font-psemibold text-base text-blackgray-100">
                Already have an account?
              </Text>
              <Link href="/sign-in" className="text-base text-headingcolor font-bold">Sign In</Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
