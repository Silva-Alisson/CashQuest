// CustomModal.js
import React, { useEffect, useRef } from "react";
import { Modal, StyleSheet, Text, View, Image, PanResponder  } from "react-native";
import { useModal } from "../context/modalContext";
import { COLORS } from "./theme";

export const CustomModal = () => {
  const { modalVisible, imageSource, text1, text2, handleCloseModal } =
    useModal();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          handleCloseModal();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (modalVisible) {
      const closeModalAfterDelay = setTimeout(() => {
        handleCloseModal();
      }, 5000);

      return () => {
        clearTimeout(closeModalAfterDelay);
      };
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleCloseModal(!modalVisible);
      }}
    >
      <View style={styles.centeredView} {...panResponder.panHandlers}>
        <View
          style={[
            styles.modalView,
          ]}
        >
          {imageSource && (
            <Image style={[styles.modalImage]} source={{uri: imageSource}} resizeMode="contain" />
          )}
          <View style={styles.textView}>
            <Text style={styles.modalText}>{text1}</Text>
            <Text style={[styles.modalText, {fontSize: 18}]}>{text2}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 75,
    alignItems: "center",
  },
  modalView: {
    flexDirection:"row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 110,
    width: "95%",
  },
  modalImage: {
    width: 75,
    height: 75,
    marginBottom: 10
  },
  textView: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    color: COLORS.greyDark
  }
});

export default CustomModal;
