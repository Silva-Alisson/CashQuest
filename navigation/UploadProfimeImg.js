import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadProfileImg from "../screens/UploadProfileImg";

const Stack = createNativeStackNavigator();

export default function UploadProfileImgStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UploadProfileImg"
        component={UploadProfileImg}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
