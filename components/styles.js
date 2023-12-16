import { StyleSheet } from "react-native";
import React from "react";
import COLORS from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.greyDark,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22
  },
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  textButton: {
    color: COLORS.white
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});

export default styles;
