// CustomModal.js
import React, { useEffect } from "react";
import { Modal, StyleSheet, Text, View, Image } from "react-native";
import { useModal } from "../context/modalContext";

export const CustomModal = () => {
  const { modalVisible, imageSource, text1, text2, handleCloseModal } =
    useModal();

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
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
          ]}
        >
          {imageSource && (
            <Image style={styles.modalImage} source={{uri: imageSource}} />
          )}
          <Text style={styles.modalText}>{text1}</Text>
          <Text style={styles.modalText}>{text2}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
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
    elevation: 5
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default CustomModal;
