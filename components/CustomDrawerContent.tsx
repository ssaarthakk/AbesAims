import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from '@expo/vector-icons/Ionicons'
import useStore, { useApiStore } from '@/utils/store'
import { removeData } from '@/utils/storage'
import * as Updates from 'expo-updates';

export default function CustomDrawerContent(props: any) {
    const setUserData = useStore((state: any) => state.addUserData);
    const setApiData = useApiStore((state: any) => state.addData);

    const handleLogout = async () => {
        removeData('userData');
        setUserData(null);
        setApiData([]);
        console.log("Logout");
        try {
            await Updates.reloadAsync();
        } catch (error) {
            console.log("Error while reloading app in Logout");
            ToastAndroid.show("Please try again", ToastAndroid.LONG);
        }
    }

    return (
        <View className='flex-1'>
            <DrawerContentScrollView {...props}>
                <View className='flex flex-row justify-between items-center p-4'>
                    <Text className='text-center text-color_five text-3xl font-montserratBold'>Menu</Text>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    onPress={handleLogout}
                    inactiveTintColor='red'
                    activeTintColor='red'
                    style={{ marginBottom: '5%' }}
                    icon={({ size }) => <Ionicons name="log-out-outline" color={'red'} size={size} />}
                />
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})