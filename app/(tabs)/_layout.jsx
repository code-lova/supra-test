import { View, Image, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'

const TabIcon = ({ icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-1">
            <Image 
                source={icon}
                resizeMode='contain'
                className='w-8 h-8'
                tintColor={color}
            />
            <Text className={` ${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}



const Tabslayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{ 
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#44C6A6',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 9,
                    borderTopColor: '#232523',
                    height: 84
                }
             }}
        >
            
            <Tabs.Screen  
               name="finder"
               options={{ 
                    title: 'Finder',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.finder}
                            color={color}
                            name="Finder"
                            focused={focused}
                        />
                    ),
                   
                }}
            />
            <Tabs.Screen  
               name="chat"
               options={{ 
                    title: 'Chat',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.chat}
                            color={color}
                            name="Chat"
                            focused={focused}
                        />
                    ),
                   
                }}
            />
            <Tabs.Screen  
               name="bookings"
               options={{ 
                    title: 'Bookings',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={icons.bookings}
                            color={color}
                            name="Bookings"
                            focused={focused}
                        />
                    ),
                   
                }}
            /> 
        </Tabs>
    </>
  )
}
 
export default Tabslayout