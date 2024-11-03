import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
}

const CustomButton = ({
    onPress,
    title,
    textStyles = "",
    containerStyles = "",
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-color_three rounded-md p-4 justify-center items-center mb-2 ${containerStyles} `}
            onPress={onPress}
        >
            <Text
                className={`font-semibold text-xl ${textStyles} text-color_five`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;