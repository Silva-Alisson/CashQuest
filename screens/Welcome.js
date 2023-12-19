import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, icons, images } from "../constants";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./Login";
import * as Animatable from "react-native-animatable";

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/fundo-welcome.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      }}
      resizeMode="cover"
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.transparent,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch"
        }}
      >
        <View style={{ flex: 1 }}>
          <Animatable.View animation="fadeInLeft" delay={700}>
            <Image
              source={require("../assets/turtle_nivel_3.png")}
              style={{
                height: 250,
                width: 140,
                borderRadius: 20,
                position: "absolute",
                top: 290,
                left: -100,
                transform: [
                  { translateX: 70 },
                  { translateY: 80 },
                  { rotate: "50deg" }
                ]
              }}
            />
          </Animatable.View>

          {/* content  */}

          <View
            style={{
              paddingHorizontal: 22,
              position: "absolute",
              top: 0,
              width: "100%"
            }}
          >
            <Animatable.Text
              delay={100}
              animation="fadeInUp"
              style={{
                marginTop: "2%",
                fontSize: 33,
                fontWeight: 800,
                color: COLORS.white
              }}
            >
              Seja Inteligente Com Suas Finanças
            </Animatable.Text>

            <Animatable.View
              delay={200}
              animation="fadeInUp"
              
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  marginTop: "0.5%"
                }}
              >
                Comece hoje a construir seu planejamento
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white
                }}
              >
                financeiro para um futuro próspero e seguro.
              </Text>
            </Animatable.View>
          </View>

          <View
            style={{
              paddingHorizontal: 22,
              position: "absolute",
              top: 600,
              width: "100%"
            }}
          >
            
            <Animatable.View delay={300} animation="fadeInUp">
              <Button
                title="Registre-se agora!"
                onPress={() => navigation.navigate("SignupStack")}
                style={{
                  marginTop: "7%",
                  width: "100%"
                }}
              />
            </Animatable.View>

            <Animatable.View
              delay={400}
              animation="fadeInUp"
              style={{
                flexDirection: "row",
                marginTop: "6%",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white
                }}
              >
                Você já tem conta conosco ?
              </Text>
              <Pressable onPress={() => navigation.navigate("LoginStack")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.white,
                    fontWeight: "bold",
                    marginLeft: 4
                  }}
                >
                  Login
                </Text>
              </Pressable>
            </Animatable.View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;
