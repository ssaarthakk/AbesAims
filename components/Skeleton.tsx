import React, { useEffect } from 'react';
import { StyleProp, ViewStyle, DimensionValue } from 'react-native';
import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    useAnimatedStyle,
    interpolateColor
} from 'react-native-reanimated';

interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = 8,
    style
}) => {
    const isLight = useSharedValue(0);

    useEffect(() => {
        isLight.value = withRepeat(
            withTiming(1, { duration: 1000 }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            isLight.value,
            [0, 1],
            ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.15)']
        );
        return { backgroundColor };
    });

    return (
        <Animated.View
            style={[
                { width, height, borderRadius },
                animatedStyle,
                style
            ]}
        />
    );
};

export default Skeleton;
