import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
    onPress: () => void;
    title?: string;
    textStyles?: string;
    containerStyles?: string;
    children?: React.ReactNode;
}

const CustomButton = ({
    onPress,
    title,
    textStyles = "",
    containerStyles = "",
    children
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-color_three rounded-md p-4 justify-center items-center mb-2 ${containerStyles} `}
            onPress={onPress}
        >
            {
                children ? (
                    children
                ) : (
                    <Text
                        className={`text-xl ${textStyles} text-color_five font-montserratBold text-center`}
                    >
                        {title}
                    </Text>
                )
            }
        </TouchableOpacity>
    );
};

export default CustomButton;