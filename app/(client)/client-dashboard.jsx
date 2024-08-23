import { View, Text, Image, FlatList, RefreshControl, Alert } from 'react-native'
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import icons from '../../constants/icons';
import CustomButtons from '../../components/CustomButtons'
import { useFormik } from 'formik';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider'
import { logoutUser } from '../../lib/appwrite'
import SearchInput from '../../components/SearchInput';
import Nurses from '../../components/Nurses';
import EmptyState from '../../components/EmptyState';
import Speciality from '../../components/Speciality';
import { allSpecialty } from '../../constants/specialty';
import useAppwrite from '../../lib/useAppwrite';
import { getAllNurses } from '../../lib/appwrite';
import NursesCard from '../../components/NursesCard';

const Clientdashboard = () => {
  const { data: nurses, refetch } = useAppwrite(getAllNurses);

  const { setIsLoggedIn, setUser } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  //this is to reload the page when you pull down 
  const onRefresh = async() => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

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
        console.error("Error logging out", error);
      }
    }
  })


  //console.log(nurses)



  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={nurses}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <NursesCard nursecard={item} title="Available Nurses" />
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-4 ">

            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-headingcolor uppercase">
                  Welcome back
                </Text>
                <Text className="text-blackgray-100 font-semibold text-2xl">Jonathan Ken</Text>
              </View>

              <View className="justify-between items-center flex-row space-x-4">
                <Image 
                  source={icons.bell}
                  className="w-9 h-6"
                  resizeMode='contain'
                />
                <Image 
                  source={images.logon}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>


            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-2 pb-8">
              <View>

                <View className="justify-between items-start flex-row">
                  <Text className="font-psemibold text-headingcolor text-lg mb-3">Speciality</Text>
                  <Text className="font-psemibold text-secondary-100 text-sm mb-3">View Nurses</Text>
                </View>

                <Speciality 
                  data={allSpecialty}
                />
              </View>

              <Text className="text-lg font-psemibold text-headingcolor mb-1">Nurses Nearby </Text>
              <Nurses 
                name={[ { id: 1}, { id: 2}, { id: 4}] ?? []}
              />
            </View>

            <View className="justify-between items-start flex-row">
              <Text className="text-lg font-psemibold text-headingcolor -mb-4">Available Nurese</Text>
              <Text className="font-psemibold text-secondary-100 text-sm">View All</Text>
            </View>


          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title="Nurses are unavailable"
            subTitle="No registered nurse yet"
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      />


      <View>
          
          {/* <CustomButtons 
            title="logout"
            handlePress={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          /> */}
      </View>
      
    </SafeAreaView>
  )
}

export default Clientdashboard