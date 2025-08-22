import { KeyboardAvoidingView, Platform, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Modal as RNModal, ModalProps } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';

type Props = ModalProps & {
    isOpen: boolean
    withInput?: boolean
    onClose?: () => void
}

export default function Modal({ isOpen, children, onClose }: Props) {

    return (
        <RNModal visible={isOpen} transparent animationType='fade' statusBarTranslucent>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                className='flex-1 justify-center items-center'
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <TouchableOpacity 
                    className='absolute inset-0' 
                    onPress={onClose}
                    activeOpacity={1}
                />
                <BlurView 
                    intensity={80} 
                    className='h-full w-screen flex-1 justify-center items-center' 
                    tint='dark'
                >
                    <View className='mx-4 max-w-md w-full'>
                        {children}
                    </View>
                </BlurView>
            </KeyboardAvoidingView>
        </RNModal>
    )
}

const styles = StyleSheet.create({})