import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from '@expo/vector-icons/Ionicons'
import useStore, { useApiStore } from '@/utils/store'
import { removeData } from '@/utils/storage'
import { router } from 'expo-router'

export default function CustomDrawerContent(props: any) {
    const setUserData = useStore((state: any) => state.addUserData);
    const setApiData = useApiStore((state: any) => state.addData);

    const handleLogout = () => {
        removeData('userData');
        setUserData(null);
        setApiData([]);
        console.log("Logout");
        router.replace('/');
    }

    return (
        <View className='flex-1'>
            <DrawerContentScrollView {...props}>
                <View className='flex flex-row justify-between items-center p-4'>
                    <Text className='text-center text-color_five text-3xl font-montserratBold'>Menu</Text>
                </View>
                <DrawerItemList {...props} />
                {/* <DrawerItem
                    label="Logout"
                    onPress={handleLogout}
                    inactiveTintColor='#fa2323'
                    style={{ marginBottom: '5%' }}
                    icon={({ size }) => <Ionicons name="log-out-outline" color={'#fa2323'} size={size} />}
                /> */}
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})