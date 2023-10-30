import React, { useState } from 'react';
import { View, Text, Button, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RadioComponent = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const getButtonStyle = (option) => {
    return {
      borderWidth: 1,
      borderColor: option === selectedOption ? COLORS.white : COLORS.white,
      backgroundColor: option === selectedOption ? COLORS.primary : COLORS.secondary,
      borderRadius: 22,
      width: '25%',
      padding: 3,
      margin: 5,
      alignItems: 'center',
    justifyContent: 'center'
      
    };
  };

  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.white,
    }}>
        <View style={{ flex: 1 }}>
            <View >

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>R$ </Text>
                <Text>0.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                style={getButtonStyle('option1')}
                onPress={() => setSelectedOption('option1')}
                >
                <Text>Despesa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={getButtonStyle('option2')}
                onPress={() => setSelectedOption('option2')}
                >
                <Text>Entrada</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={getButtonStyle('option3')}
                onPress={() => setSelectedOption('option3')}
                >
                <Text>Poupança</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{selectedOption}</Text>
            </View>
        </View>
    </SafeAreaView>
  );
};

export default RadioComponent;
