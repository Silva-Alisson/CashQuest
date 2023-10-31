import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styles from '../components/styles';

const Register = () => {
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

  
  const [value, setValue] = useState('0.00');

  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.white,
    }}>
        <View style={{ flex: 1, }}>
            <View style={{backgroundColor: COLORS.white, width:'100%', borderBottomStartRadius: 42, borderBottomEndRadius: 42, shadowColor: '#000', shadowOffset: {width: 0, height: 5},shadowOpacity: 0.95, shadowRadius: 3.84, elevation: 8,}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10 }}>Nova Transação</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 12 }}>
                    <Text style={{fontSize: 20}}>R$ </Text>
                    <TextInput
                      style={{fontSize: 40}}
                      value={value}
                      onChangeText={(text) => setValue(text)}
                      onFocus={() => setValue('')}
                      onBlur={() => {
                        if (value === '') {
                          setValue('0.00');
                        }
                      }}
                      keyboardType="numeric"
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
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
            </View>
            <Text>{selectedOption}</Text>
            <View style={{ marginHorizontal:22, marginVertical: 10 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Categoria</Text>

                        <View style={styles.input}>
                            <TextInput
                                label={'nome'}
                                onChangeText={text => setValue('nome', text)}
                                placeholder='salário'
                                placeholderTextColor={COLORS.grey}
                                keyboardType='name-phone-pad'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Descrição</Text>

                        <View style={styles.input}>
                            <TextInput
                                label={'nome'}
                                onChangeText={text => setValue('nome', text)}
                                placeholder='descrição'
                                placeholderTextColor={COLORS.grey}
                                keyboardType='name-phone-pad'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Data</Text>

                        <View style={styles.input}>
                            <TextInput
                                label={'nome'}
                                onChangeText={text => setValue('nome', text)}
                                placeholder='00/00/00'
                                placeholderTextColor={COLORS.grey}
                                keyboardType='name-phone-pad'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Comentário</Text>

                        <View style={styles.input}>
                            <TextInput
                                label={'nome'}
                                onChangeText={text => setValue('nome', text)}
                                placeholder='R$ 00,00'
                                placeholderTextColor={COLORS.grey}
                                keyboardType='name-phone-pad'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>
           
        </View>
    </SafeAreaView>
  );
};

export default Register;
