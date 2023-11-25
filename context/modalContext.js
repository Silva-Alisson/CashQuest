// ModalContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import { useAuth } from './auth';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const { authData } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handleShowModal = (params) => {
    setImageSource(params.img);
    setText1(params.text1);
    setText2(params.text2);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setImageSource(null);
    setText1('');
    setText2('');
    setModalVisible(false);
  };

  const contextValue = useMemo(() => ({
    modalVisible,
    imageSource,
    text1,
    text2,
    handleShowModal, 
    handleCloseModal
  }), [modalVisible, setModalVisible, imageSource, setImageSource, text1, setText1, text2, setText2, handleShowModal, handleCloseModal]);

  return (
    <ModalContext.Provider value={ contextValue }>
      {children}
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}
