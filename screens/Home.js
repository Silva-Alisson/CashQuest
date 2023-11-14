import { View, Text, Image, ScrollView, TouchableOpacity,FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import * as Progress from "react-native-progress";
import getWallet from "../services/wallet-service/wallet-service";
import { getPet } from "../services/pet-service/get-pet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/auth";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [dados, setDados] = useState([]);
  const { authData } = useAuth();
  const [dadosPet, setDadosPet] = useState([]);
  const [progress, setProgress] = useState(0.0);

  
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      async function fetchDataPet() {
        const response = await getPet(authData.token, authData.userId);
        const arrayResponse = Object.keys(response).map(
          (chave) => response[chave]
        );
        setDadosPet(arrayResponse);
        if(arrayResponse) {
            const calcProgress = arrayResponse[1] / 500;
            setProgress(calcProgress);
        }
      }

      fetchDataPet();      

      async function fetchDataWallet() {
        const response = await getWallet(authData.token, authData.userId);
        const arrayResponse = Object.keys(response).map(
          (chave) => response[chave]
        );
        setDados(arrayResponse);
      }

      fetchDataWallet();

    };

    
  }, [isFocused]);

  const data = [
    {
      id: '1',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '11',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
        {
          id: '12',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
        {
          id: '12',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
        {
          id: '12',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
    {
      id: '2',
      day: 'Hoje',
      total: '+ 52.00',
      details: [
        {
          id: '13',
          totalAmount: '+R$ 52.00',
          category: 'Investimentos',
          description: 'Ganhei no jogo do bicho',
          iconName: 'close',
        },
      ],
    },
  ];

  const DetailItem = ({ item }) => (
    <View style={{ flexDirection: 'column', margin: 10,  }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.grey, paddingTop: 10, paddingHorizontal: 10  }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: '#BAE6BC', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name={item.iconName} size={30} color='#5DA660' />
          </View>
  
          <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
            <Text style={{ fontSize: 16 }}>{item.category}</Text>
            <Text style={{ fontSize: 12 }}>{item.description}</Text>
          </View>
        </View>
        <Text style={{ color: '#5DA660', fontSize: 18 }}>{item.totalAmount}</Text>
      </View>
    </View>
  );

  const DayItem = ({ item }) => (
    <View style={{ marginBottom: 10, justifyContent: 'center', paddingVertical: 10, backgroundColor:COLORS.white, ...Platform.select({
      android: {
        elevation: 5,
        backgroundColor: '#fff', // Adiciona uma cor de fundo para corrigir o problema no Android
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
    }}>
      <View style={{ marginBottom: 10, justifyContent: 'center',   }}>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginHorizontal: 10,  }}>
          <Text style={{ fontSize: 20, paddingHorizontal: 10}}>{item.day}</Text>
          <Text style={{ fontSize: 20, paddingHorizontal: 10, color: '#5DA660'}}>{item.total}</Text>
        </View>
        <FlatList
          data={item.details}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DetailItem item={item} />}
        />
      </View>
    </View>
  );
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: COLORS.primary,
            width: "100%",
            height: "40%",
            borderBottomEndRadius: 40,
            borderBottomStartRadius: 40,
            marginBottom: 10
          }}
        >
          <Image
            source={{ uri: dadosPet[0] }}
            resizeMode="contain"
            style={{
              height: "40%",
              width: "30%",
              margin: 25
            }}
          />
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20
            }}
          >
            {dadosPet[2]}
          </Text>

          <View style={{ alignItems: "center" }}>
            <Progress.Bar
              progress={progress}
              width={300}
              height={20}
              color={COLORS.third}
              backgroundColor={COLORS.white}
              borderRadius={15}
              borderWidth={0}
              style={{ margin: 10 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRadius: 16,
              width: "90%",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20
              }}
            >
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                {" "}
                R$ {dados[0]}
              </Text>
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                Carteira
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20
              }}
            >
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                R$ {dados[2]}
              </Text>
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                Reservas
              </Text>
            </View>
          </View>
        </View>

        
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 16,
                backgroundColor: COLORS.white,
                
                
                ...Platform.select({
                  android: {
                    elevation: 4,
                    backgroundColor: '#fff', // Adiciona uma cor de fundo para corrigir o problema no Android
                  },
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                  },
                }),
              }}
            >
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name={"chevron-left"}
                  size={42}
                  color="#000"
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  paddingHorizontal: "14%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: COLORS.black, fontSize: 36 }}>Outubro</Text>
                <Text style={{ color: COLORS.black, fontSize: 15 }}>Suas movimentações</Text>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name={"chevron-right"}
                  size={42}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingBottom: 20, paddingTop: 5  }}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <DayItem item={item} />}
            />
          </View>
        
      </View>
      
    </SafeAreaView>
  );
};

export default Home;
