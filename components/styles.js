import { StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
    },
})

export default styles