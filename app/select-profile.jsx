import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images';
import CustomButtons from '../components/CustomButtons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../lib/appwrite';
import { useRouter, useLocalSearchParams } from 'expo-router';

const SelectProfile = () => {

    const router = useRouter();
    const { name, email, password } = useLocalSearchParams(); // Retrieve signup data from query params
    const [selectedRole, setSelectedRole] = useState(''); // State to track selected role



    const formik = useFormik({
        initialValues: {
          role: '', // The role that the user selects
        },

        validationSchema: Yup.object().shape({
            role: Yup.string().required("You must select a profile"),
        }),

        onSubmit: async(values, { setSubmitting }) => {
            setSubmitting(true);

            try{

                // Create user and store their role in Appwrite
                await createUser(email, password, name, values.role);
                Alert.alert('A verification link was sent to', `${email}!`);
                router.replace('/sign-in'); // Navigate to the home page after successful signup

            }catch (error) {
                Alert.alert('Error', error.message || 'Failed to create dcoument');
            } finally {
                setSubmitting(false);
            }
        }


    });


    // Function to handle button press and set the selected role
    const handleRoleSelection = (role) => {
        setSelectedRole(role);
        formik.setFieldValue('role', role);
    };

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full px-8 m-h-[85vh] mt-20">

                <Image 
                    source={images.logo}
                    className="w-[200px] mx-auto"
                    resizeMode="contain"
                />

                <View className="mt-6">
                    <Text className="text-lg font-psemibold text-headingcolor uppercase text-center">
                        Welcome
                    </Text>
                    <Text className="text-center py-2 text-headingcolor font-psemibold text-lg uppercase">
                        Please select your preferred profile
                    </Text>
                    <Text className="py-10 text-center text-headingcolor font-pextrabold text-xl uppercase">Are you a </Text>
                </View>
                

                <View className="flex flex-row justify-between items-center py-8">
                    <CustomButtons
                        title="CLIENT"
                        handlePress={() => handleRoleSelection('client')}
                        containerStyles={`w-[160px] ${selectedRole === 'client' ? 'bg-headingcolor' : 'bg-gray-200'}`}
                        textStyles={`${selectedRole === 'client' ? 'text-white' : 'text-black'}`}
                        isLoading={formik.isSubmitting && selectedRole === 'client'}
                    />

                    <CustomButtons
                        title="NURSE"
                        handlePress={() => handleRoleSelection('nurse')}
                        containerStyles={`w-[160px] ${selectedRole === 'nurse' ? 'bg-headingcolor' : 'bg-gray-200'}`}
                        textStyles={`${selectedRole === 'nurse' ? 'text-white' : 'text-black'}`}
                        isLoading={formik.isSubmitting && selectedRole === 'nurse'}
                    />
                </View>

                <View className="py-6">
                    <CustomButtons
                        title={formik.isSubmitting ? 'Processing...' : 'Create my account'}
                        handlePress={formik.handleSubmit}
                        isLoading={formik.isSubmitting}
                    />
                </View>


            </View>
        </ScrollView>
    </SafeAreaView>
    
  )
}

export default SelectProfile