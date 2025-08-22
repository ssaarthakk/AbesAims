import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from '@expo/vector-icons/Ionicons'
import useStore, { useApiStore } from '@/utils/store'
import { removeData } from '@/utils/storage'
import * as Updates from 'expo-updates';
import { LinearGradient } from 'expo-linear-gradient'
import { color_primary, color_secondary, color_error } from '@/constants/Colors'

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
        <View className='flex-1 bg-color_surface'>
            <DrawerContentScrollView {...props}>
                {/* Header */}
                <View className='px-6 py-8 mb-4'>
                    <LinearGradient
                        colors={[color_primary, color_secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className='rounded-2xl p-6 items-center'
                    >
                        <View className='w-16 h-16 bg-white rounded-full items-center justify-center mb-3'>
                            <Ionicons name="school" size={32} color={color_primary} />
                        </View>
                        <Text className='text-white text-2xl font-montserratBold text-center'>
                            ABES AIMS
                        </Text>
                        <Text className='text-primary-100 text-sm font-montserratMedium text-center mt-1'>
                            Student Portal
                        </Text>
                    </LinearGradient>
                </View>
                
                {/* Menu Items */}
                <DrawerItemList {...props} />
                
                {/* Logout */}
                <View className='px-4 pt-6 border-t border-color_border mt-4'>
                    <DrawerItem
                        label="Logout"
                        onPress={handleLogout}
                        inactiveTintColor={color_error}
                        activeTintColor={color_error}
                        labelStyle={{ 
                            fontFamily: 'Montserrat-Medium',
                            marginLeft: -20
                        }}
                        icon={({ size }) => (
                            <Ionicons name="log-out-outline" color={color_error} size={size} />
                        )}
                        style={{
                            backgroundColor: '#fef2f2',
                            marginHorizontal: 0,
                            borderRadius: 12,
                        }}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})