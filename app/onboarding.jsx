import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import images from '../constants/images';
import { router } from 'expo-router';

const OnboardingScreen = () => {

  //Styling the slider button component 
  const DotComponent = ({ selected }) => {
    return (
      <View className={`w-2 h-2 ${selected ? 'border border-teal-600 bg-customgreen': 'bg-primary'} rounded-full p-2 mx-1`} />
    )
  }

  return (
      
    <Onboarding
      onSkip={() => router.replace('sign-in')}
      onDone={() => router.replace('sign-in')}
      DotComponent={DotComponent}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={images.slide1} className="w-[380px] h-[300px]" resizeMode='contain' />,
          title: 'For The Elderly',
          subtitle: 'Have no hard time finding a ​compassionate person to care for ​that loved one with our help',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={images.slide2} className="w-[380px] h-[300px]" resizeMode='contain' />,
          title: 'AI Match Maker',
          subtitle: 'Connect with trusted caregivers and find the right care for your health needs in just a few steps.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={images.slide3} className="w-[380px] h-[300px]" resizeMode='contain' />,
          title: 'For Nurses and Caregivers',
          subtitle: 'Connect with families in need and ​get full paying job offers that meet ​your field of studies',
        },
      
      ]}
    />
    
  )
}

export default OnboardingScreen