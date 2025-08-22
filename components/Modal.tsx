import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Modal as RNModal, ModalProps } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';

type Props = ModalProps & {
    isOpen: boolean
    withInput?: boolean
}

export default function Modal({ isOpen, children }: Props) {

    return (
        <RNModal visible={isOpen} transparent animationType='fade' statusBarTranslucent>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 justify-center items-center bg-black/70'>
                <BlurView intensity={100} className='h-[80vh] w-screen flex-1 justify-center items-center' tint='dark'>
                    {children}
                </BlurView>
            </KeyboardAvoidingView>
        </RNModal>
    )
}

const styles = StyleSheet.create({})