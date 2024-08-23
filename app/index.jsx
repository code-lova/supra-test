import { ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images'
import CustomButtons from '../components/CustomButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
    const { isLoading, isLoggedIn, user } = useGlobalContext();
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);


    useEffect(() => {
        const checkFirstLaunch = async () => {
            const hasLaunched = await AsyncStorage.getItem("alreadyLaunched");
            if (hasLaunched === null) {
                await AsyncStorage.setItem("alreadyLaunched", "true");
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        };
        checkFirstLaunch();
    }, []);


    useEffect(() => {
        if (!isLoading && isLoggedIn && user) {
            // Navigate based on the user's role
            if (user.roles === 'client') {
                router.replace('/client-dashboard');
            } else if (user.roles === 'nurse') {
                router.replace('/nurse-dashboard');
            } else {
                Alert.alert('Login Failed', 'No valid role found for this user.');
            }
        }
    }, [isLoading, isLoggedIn, user]);

    if (isLoading || isLoggedIn) {
        // Render a loading screen while checking user state
        return (
            <SafeAreaView className="bg-primary h-full mt-28">
                <View className="flex justify-center items-center">
                    <Image 
                        source={images.logo}
                        className="w-[200px]"
                        resizeMode='contain'
                    />

                    <ActivityIndicator size="large" color="#2a7874" className="mt-6" />

                </View>
            </SafeAreaView>
        );
    }

  return (
   <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}> 
            <View className="w-full px-8 min-h-[85vh] justify-center items-center ">
                <Image 
                    source={images.logon}
                    className="w-[60px] h-[70px]"
                    resizeMode='contain'
                />

                <View className="relative mt-5">
                    <Text className="font-psemibold text-xl text-center">
                        In Home Healthcare App With
                        <Text className="font-pbold text-2xl uppercase text-secondary"> Supracarer</Text>
                    </Text>

                    <Image 
                        source={images.homescreen}
                        className="w-[380px] h-[300px] m-6"
                        resizeMode='contain'
                    />

                    <Text className="mt-6 text-center text-[#494b4b] font-psemibold text-[14px] px-10">
                        Top A.I generated matchmaking with ​highly trained caregivers, reliable ​assistance, 
                        round-the-clock services, ​and more...
                    </Text>
                </View>
                
                {isFirstLaunch ? (
                    <CustomButtons
                        title="Get Started"
                        handlePress={() => router.replace('/onboarding')}
                        containerStyles="w-full mt-7"
                    />
                ): (
                    <CustomButtons
                        title="Sign In"
                        handlePress={() => router.replace('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                )}
            </View>
        </ScrollView>

   </SafeAreaView>
  );
}


 