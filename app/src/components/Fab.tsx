import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    titulo: string;
    position: "button_right" | "button_left";
    action: () => void;
}

export const Fab = ({ titulo, position, action }: Props) => {

    const btnPosition = (position == "button_right")
        ? style.fabLocationBR
        : style.fabLocationBL;

    return (
        <TouchableOpacity
            onPress={() => action()}
            style={btnPosition}
        >
            <View
                style={style.fab}
            >
                <Text
                    style={style.fabText}
                >
                    {titulo}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    fabLocationBR: {
        position: "absolute",
        bottom: 25,
        right: 25,
    },
    fabLocationBL: {
        position: "absolute",
        bottom: 25,
        left: 25,
    },
    fab: {
        backgroundColor: "violet",
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: "center"
    },
    fabText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center"
    }
});