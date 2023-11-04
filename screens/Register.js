import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import Button from '../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../components/styles';
import Checkbox from "expo-checkbox"

const Register = ({ navigation , route}) => {

    const [selectedCategory, setSelectedCategory] = useState('');
    
    useEffect(() => {
        if (route.params && route.params.selectedCategory) {
            setSelectedCategory(route.params.selectedCategory);
          }
      }, [route.params]);

  const [selectedOption, setSelectedOption] = useState('despesa');

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

  const [isCheckedFix, setIsCheckedFix] = useState(false);
  const [isCheckedTranfer, setIsCheckedTransfer] = useState(false);

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
                    style={getButtonStyle('despesa')}
                    onPress={() => setSelectedOption('despesa')}
                    >
                    <Text>Despesa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={getButtonStyle('entrada')}
                    onPress={() => setSelectedOption('entrada')}
                    >
                    <Text>Entrada</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={getButtonStyle('poupança')}
                    onPress={() => setSelectedOption('poupança')}
                    >
                    <Text>Poupança</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginHorizontal:22, marginVertical: 10 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Categoria</Text>
                        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("CategoriesStack")}>
                            <TextInput
                                type="button"
                                label={'nome'}
                                onChangeText={text => setValue('nome', text)}
                                placeholder={selectedCategory}
                                placeholderTextColor={COLORS.grey}
                                keyboardType='name-phone-pad'
                                style={{
                                    width: "100%"
                                }}
                                editable={false}
                            />
                        </TouchableOpacity>

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

                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Comentário</Text>

                        <View style={styles.input}>
                            <TextInput
                                label={'nome'}
                                onChangeText={text => setValue('nome', text)}
                                placeholder='comentário...'
                                placeholderTextColor={COLORS.grey}
                                keyboardType='name-phone-pad'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                        <View style={{
                            marginTop: 16,
                            flexDirection: 'row',
                            marginVertical: 6,
                            justifyContent: "space-between"
                        }}>
                            <Text  style={{
                            fontSize: 16,
                            fontWeight: 400,
                        }}>Despesa fixa</Text>
                            <Checkbox
                                style={{ marginRight: 8, borderRadius:18 }}
                                value={isCheckedFix}
                                onValueChange={setIsCheckedFix}
                                color={isCheckedFix ? COLORS.primary : undefined}
                            />
                        </View>
                        {isCheckedFix ? (
                            <View>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 400,
                                    marginVertical: 8
                                }}>Quantidade</Text>
        
                                <View style={styles.input}>
                                    <TextInput
                                        label={'nome'}
                                        onChangeText={text => setValue('nome', text)}
                                        placeholder='0'
                                        placeholderTextColor={COLORS.grey}
                                        keyboardType='name-phone-pad'
                                        style={{
                                            width: "100%"
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null}
                        {selectedOption === 'poupança' ? (
                            <View style={{
                                marginTop: 16,
                                flexDirection: 'row',
                                marginVertical: 6,
                                justifyContent: "space-between"
                            }}>
                                <Text  style={{
                                fontSize: 16,
                                fontWeight: 400,
                                }}>É uma transferencia:</Text>
                                <Checkbox
                                style={{ marginRight: 8, borderRadius:18 }}
                                value={isCheckedTranfer}
                                onValueChange={setIsCheckedTransfer}
                                color={isCheckedTranfer ? COLORS.primary : undefined}
                                />
                            </View>
                        ) : null}
                        {selectedOption === 'despesa' ? (
                            <View style={{
                                marginTop: 16,
                                flexDirection: 'row',
                                marginVertical: 6,
                                justifyContent: "space-between"
                            }}>
                                <Text  style={{
                                fontSize: 16,
                                fontWeight: 400,
                                }}>Retirado da poupança:</Text>
                                <Checkbox
                                style={{ marginRight: 8, borderRadius:18 }}
                                value={isCheckedTranfer}
                                onValueChange={setIsCheckedTransfer}
                                color={isCheckedTranfer ? COLORS.primary : undefined}
                                />
                            </View>
                        ) : null}
                        <View style={{marginTop: 16, justifyContent: 'center', alignItems: 'center'}}>
                            {selectedOption === 'despesa' ? (
                                <Text  style={{
                                    fontSize: 16,
                                    fontWeight: 400,
                
                                }}>Você vai ganhar 60 de xp!</Text>
                            ): selectedOption === 'entrada' ? (
                                <Text  style={{
                                    fontSize: 16,
                                    fontWeight: 400,
                
                                }}>Você vai ganhar 30 de xp!</Text>
                            ): selectedOption === 'poupança' ? (
                                <Text  style={{
                                    fontSize: 16,
                                    fontWeight: 400,
                
                                }}>Você vai ganhar 45 de xp!</Text>
                            ): null}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginVertical: 16}}>
                            <Button
                                title="confirmar"
                                filled
                                style={{
                                    padding:16,
                                    with: 20,
                                    height: 60
                                }}
                            />

                            <Button
                                title="cancelar"
                                filled
                                style={{
                                    padding:16,
                                    with: 20,
                                    height: 60,
                                    backgroundColor: '#fff',
                                    color: COLORS.primary
                                }}
                            />   
                        </View>
                    </View>
        </View>
    </SafeAreaView>
  );
};

export default Register;
