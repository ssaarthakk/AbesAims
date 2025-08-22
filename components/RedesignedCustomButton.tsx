import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface CustomButtonProps {
    onPress: () => void;
    title?: string;
    textStyles?: string;
    containerStyles?: string;
    children?: React.ReactNode;
    isLoading?: boolean;
}

const RedesignedCustomButton = ({
    onPress,
    title,
    textStyles = "",
    containerStyles = "",
    children,
    isLoading = false
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-color_three rounded-xl p-4 justify-center items-center mb-2 shadow-md shadow-black ${containerStyles} flex-row`}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : children ? (
                children
            ) : (
                <Text
                    className={`text-lg ${textStyles} text-color_five font-montserratBold text-center`}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default RedesignedCustomButton;