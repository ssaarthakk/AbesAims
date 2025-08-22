import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

interface CustomButtonProps {
    onPress: () => void;
    title?: string;
    textStyles?: string;
    containerStyles?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const CustomButton = ({
    onPress,
    title,
    textStyles = "",
    containerStyles = "",
    children,
    variant = 'primary',
    size = 'md',
    disabled = false
}: CustomButtonProps) => {
    
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary-500 shadow-lg shadow-primary-500/25';
            case 'secondary':
                return 'bg-secondary-500 shadow-lg shadow-secondary-500/25';
            case 'outline':
                return 'bg-transparent border-2 border-primary-500';
            case 'ghost':
                return 'bg-transparent';
            case 'success':
                return 'bg-success-500 shadow-lg shadow-success-500/25';
            case 'warning':
                return 'bg-warning-500 shadow-lg shadow-warning-500/25';
            case 'error':
                return 'bg-error-500 shadow-lg shadow-error-500/25';
            default:
                return 'bg-primary-500 shadow-lg shadow-primary-500/25';
        }
    };

    const getTextVariantStyles = () => {
        switch (variant) {
            case 'outline':
                return 'text-primary-500';
            case 'ghost':
                return 'text-primary-500';
            default:
                return 'text-white';
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'px-4 py-2 rounded-lg';
            case 'md':
                return 'px-6 py-3 rounded-xl';
            case 'lg':
                return 'px-8 py-4 rounded-xl';
            default:
                return 'px-6 py-3 rounded-xl';
        }
    };

    const getTextSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'text-sm';
            case 'md':
                return 'text-base';
            case 'lg':
                return 'text-lg';
            default:
                return 'text-base';
        }
    };

    const disabledStyles = disabled ? 'opacity-50' : '';
    const activeOpacity = disabled ? 1 : 0.8;

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            className={`justify-center items-center mb-3 transition-all duration-200 ${getVariantStyles()} ${getSizeStyles()} ${disabledStyles} ${containerStyles}`}
            onPress={disabled ? () => {} : onPress}
            disabled={disabled}
        >
            {children ? (
                children
            ) : (
                <Text
                    className={`${getTextSizeStyles()} ${getTextVariantStyles()} font-montserratSemiBold text-center ${textStyles}`}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;