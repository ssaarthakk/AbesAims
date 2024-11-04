import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import React, { useEffect } from 'react'
import { color_four } from '@/constants/Colors';

export default function LoadinSvg({ loading, color, size }: { loading: boolean, color?: string, size?: number }) {

    const rotation = useSharedValue(0);
    useEffect(() => {
        if (loading) {
            rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
        } else {
            rotation.value = 0;
        }
    }, [loading, rotation]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <Animated.View style={[animatedStyle]} className='flex justify-center items-center'>
            <Svg
                width={size? size: 24}
                height={size? size: 24}
                fill="none"
                viewBox="0 0 24 24"
            >
                <Path
                    stroke={color? color: color_four}
                    strokeLinecap="round"
                    strokeWidth={3.556}
                    d="M20 12a8 8 0 0 1-11.76 7.061"
                />
            </Svg>
        </Animated.View>
    )
}