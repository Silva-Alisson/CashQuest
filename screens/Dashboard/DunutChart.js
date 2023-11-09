import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';

const DunutChart = () => {
    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;

    const expired = 1;
    const nonExpired = 2;
    const total = expired + nonExpired;

    const data = [
        {color: '#96E283', label: 'Economias de Emergência', value: 75},
        {color: '#72C990', label: 'Poupança', value: 25},
        {color: '#1C5926', label: 'Poupança para Férias', value: 25}
    ];

    // for (let i = 1; i <= expired; i++) {
    //     data.push({
    //         color: '#F0A500'
    //     });
    // }

    // for (let i = 1; i <= nonExpired; i++) {
    //     data.push({color: '#334756'});
    // }

    const percentage = (1 / total) * 100;
    const strokeDashoffset =
        circleCircumference - (circleCircumference * percentage) / 100;

    const angle = (1 / total) * 360;
    const sliceSpacing = total === 1 ? 0 : 4;

    return (
        <View style={styles.container}>
            <View style={styles.graphWrapper}>
                <Svg height='160' width='160' viewBox='0 0 180 180'>
                    <G rotation={-90} originX='90' originY='90'>
                        {total === 0 ? (
                            <Circle
                                cx='50%'
                                cy='50%'
                                r={radius}
                                stroke='#F1F6F9'
                                fill='transparent'
                                strokeWidth='40'
                            />
                        ) : (
                            data.map((element, index) => (
                                <>
                                    <Circle
                                        key={index}
                                        cx='50%'
                                        cy='50%'
                                        r={radius}
                                        stroke={element.color}
                                        fill='transparent'
                                        strokeWidth='40'
                                        strokeDasharray={circleCircumference}
                                        strokeDashoffset={
                                            strokeDashoffset + sliceSpacing
                                        }
                                        rotation={angle * index}
                                        originX='90'
                                        originY='90'
                                    />
                                </>
                            ))
                        )}
                    </G>
                </Svg>
                <Text style={styles.label}>lol</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginTop: 40
                }}>
                {data.map((item, index) => (
                    <View
                        key={item.label}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 20
                        }}>
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginRight: 5,
                                backgroundColor: item.color
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'black',
                                numberOfLines: 1,
                                ellipsizeMode: 'tail'
                            }}>
                            {item.value} - {item.label}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    graphWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
        color: '#082032'
    }
});
export default DunutChart;
