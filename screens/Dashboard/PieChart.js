import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const PieChartComponent = () => {
    const data = [
        {
            name: 'Income',
            population: 5000,
            color: '#37A11C',
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
            label: 'Income',
            labelColor: '#000000',
            labelFontSize: 14,
            percentage: '' // Add an empty string for now
        },
        {
            name: 'Outcome',
            population: 6000,
            color: '#F3722C',
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
            label: 'Outcome',
            labelColor: '#000000',
            labelFontSize: 14,
            percentage: '' // Add an empty string for now
        }
    ];
    const totalPopulation = data.reduce(
        (total, item) => total + item.population,
        0
    );

    console.log(
        data.forEach((item) => {
            item.percentage =
                ((item.population / totalPopulation) * 100).toFixed(0) + '%';
        })
    );

    return (
        <View style={{}}>
            <PieChart
                data={data}
                width={Dimensions.get('window').width - 10}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                style={{
                    borderRadius: 16
                }}
                hasLegend={false}
                accessor='population'
                backgroundColor='transparent'
                paddingLeft='50'
                renderLabel={({label, percentage}) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                        <Text
                            style={{
                                color: labelColor,
                                fontSize: labelFontSize
                            }}>
                            {label}
                        </Text>
                        <Text
                            style={{
                                color: labelColor,
                                fontSize: labelFontSize
                            }}>
                            {percentage}
                        </Text>
                    </View>
                )}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {data.map((item) => (
                    <View
                        key={item.name}
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
                                fontSize: item.labelFontSize,
                                color: item.labelColor
                            }}>
                            {item.percentage} - {item.label}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default PieChartComponent;
