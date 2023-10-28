const Achievements = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}>

            <View style={{ flex: 1, alignItems: "center"}}>
                <View style={{alignItems: "center", backgroundColor: COLORS.primary, width:'100%', height:'50%'}}>
                    <Image
                        source={require("../assets/pet_teste.png")}
                        resizeMode="contain"
                        style={{                        height: '20%',
                            width: '20%',
                            borderRadius: 999,
                            borderColor: COLORS.white,
                            borderWidth: 2,
                            marginTop: 25,
                    }} />
                    <Text
                        style={{
                            color: COLORS.white,
                            marginVertical: 8,
                            fontSize: 25
                            }}
                    >Arquielorinho</Text>
                    <View
                        style={{
                                margin: 8,
                            flexDirection: "row",
                            backgroundColor: COLORS.primary,
                            borderRadius: 16,
                            width: '90%',
                            justifyContent: 'center',
                            
                    }}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }} >
                            <Text style={{
                                color: COLORS.white,
                            }}> R$ {dados[0]}</Text>
                            <Text style={{
                                color: COLORS.white,
                            }}>Carteira
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                }}>R$ {dados[3]}</Text>
                                <Text
                                    style={{
                                        color: COLORS.white,
                                }}>Reservas</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <ProgressBar 
                            progress={progressValue}
                            width={200}
                            color={COLORS.primary}
                            height={10}
                            borderRadius={5}
                            style={{ marginVertical: 20 }}
                        />
                        <Text style={{ fontSize: 16, color: COLORS.primary }}>
                            Progresso: {Math.round(progressValue * 100)}%
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}