import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

interface Props {
    id: string;
    estado: string;
    temperatura_c: number;
}



export const SensorCard = ({ id, estado, temperatura_c }: Props) => {

    const widthDimensions = Dimensions.get("window").width;

    return (

        <TouchableOpacity style={{
            ...style.cardContainer,
            width: widthDimensions
        }}>

            <View
            >
                <Text style={style.name}>{estado}</Text>
                <Text style={style.name}>ID: {id}</Text>
                <Text style={style.temperature}>{temperatura_c}°C</Text>


            </View>

        </TouchableOpacity>

    );

}



const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        borderColor: "blue",
        borderWidth: 2,
        width: 80,
        height: 200,
        marginBottom: 25,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "white"
    },
    name: {
        color: "black",
        fontSize: 18,
        marginHorizontal: 10,
    },
    temperature: {
        color: "black",
        fontSize: 14,
        marginHorizontal: 10,
        marginTop: 5,
    },
});
