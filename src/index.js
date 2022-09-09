import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('screen').width;
const loaderWidth = screenWidth - 40;

const SkeletonLoader = (props) => {
    let { height, width, r, x, y } = props;

    const animatedWave = useSharedValue(-loaderWidth);

    useEffect(() => {
        animatedWave.value = withRepeat(
            //последовательный запуск анимации
            withDelay(
                700,
                withSequence(
                    //длительность и значение анимации
                    withTiming(0, {
                        duration: 1000,
                        easing: Easing.linear,
                    }),
                    //длительность и значение анимации
                    withTiming(0, {
                        duration: 1,
                    })
                )
            ),
            -1,
            false
        ); //количество повторений и будет ли осуществен вызов колебека
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        // console.log('animatedWave.value', animatedWave.value)
        return {
            opacity: animatedWave.value + loaderWidth,
        };
    });

    const animatedWaveStyles = useAnimatedStyle(() => {
        return {
            left: animatedWave.value,
        };
    });

    height = Number(r) ? Number(r) * 2 : Number(height);
    width = Number(r) ? Number(r) * 2 : Number(width);
    r = Number(r) ? Number(r) : 0;
    y = Number(y);
    x = Number(x);

    const loaderSidesColor = '#F3F3F4';
    const loaderCenterColor = '#fafafa';

    return (
        <View
            style={[
                styles.loaderRow,
                {
                    height: height,
                    width: width,
                    borderRadius: r,
                    overflow: 'hidden',
                    position: 'absolute',
                    top: y,
                    left: x,
                },
            ]}
        >
            <Animated.View style={[styles.animationContainer, animatedStyles]}>
                <Animated.View
                    style={[styles.animatedWave, animatedWaveStyles]}
                >
                    <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0.0, y: 0 }}
                        locations={[0, 0.4, 0.5, 0.6, 1]}
                        colors={[
                            loaderSidesColor,
                            loaderSidesColor,
                            loaderCenterColor,
                            loaderSidesColor,
                            loaderSidesColor,
                        ]}
                        style={styles.gradientStyle}
                        useAngle={true}
                        angle={-45}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
    loaderRow: {
        backgroundColor: '#F3F3F4',
        flexGrow: 1,
    },
    animationContainer: {
        backgroundColor: 'black',
        borderRadius: 4,
        overflow: 'hidden',
        flex: 1,
    },
    animatedWave: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: loaderWidth * 2,
    },
    gradientStyle: {
        width: loaderWidth * 2,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
    },
});
