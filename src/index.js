import React, { useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withDelay,
    withSequence,
    withTiming,
    useSharedValue,
    Easing,
    withRepeat,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const screenWidth = Dimensions.get('screen').width;

const SkeletonLoader2 = (props) => {
    const animatedWave = useSharedValue(-screenWidth);

    useEffect(() => {
        animatedWave.value = withRepeat(
            withDelay(
                700,
                withSequence(
                    withTiming(screenWidth, {
                        duration: 1000,
                        easing: Easing.linear,
                    }),
                    withTiming(screenWidth, {
                        duration: 1,
                    })
                )
            ),
            -1,
            false
        );
    }, []);

    const animatedWaveStyles = useAnimatedStyle(() => {
        return {
            left: animatedWave.value,
        };
    });

    const cloneDeepComponent = (Component) => {
        if (Component.props?.children instanceof Array) {
            return (
                <View
                    style={Component.props.style}
                    shitProp={Component.props.shitProp}
                >
                    {Component.props.children.map((subComponent) => {
                        if (subComponent.props.children) {
                            return cloneDeepComponent(subComponent);
                        } else {
                            subComponent.props.style.backgroundColor = 'red';
                            return subComponent;
                        }
                    })}
                </View>
            );
        } else {
            return Component;
        }
    };

    const newChildren = cloneDeepComponent(props.children);

    return (
        <MaskedView style={styles.maskContainer} maskElement={newChildren}>
            <View style={styles.container}>
                <Animated.View style={[styles.flex1, animatedWaveStyles]}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.4, 0.5, 0.6, 1]}
                        colors={[
                            'rgba(255, 255, 255, 0)',
                            'rgba(255, 255, 255, 0)',
                            'rgba(255, 255, 255, 1)',
                            'rgba(255, 255, 255, 0)',
                            'rgba(255, 255, 255, 0)',
                        ]}
                        useAngle={true}
                        angle={-85}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                        style={styles.gradientStyle}
                    />
                </Animated.View>
            </View>
        </MaskedView>
    );
};
export default SkeletonLoader2;

const styles = StyleSheet.create({
    maskContainer: { flexGrow: 1 },
    container: { flex: 1, backgroundColor: '#F3F3F4' },
    flex1: { flex: 1 },
    gradientStyle: { flex: 1, width: screenWidth },
});
