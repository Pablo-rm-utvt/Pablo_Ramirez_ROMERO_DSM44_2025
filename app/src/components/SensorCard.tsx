import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

interface Props {
    id: string;
    estado: string;
    temperatura_c: number;
    distacia_cm: number;
    fecha: any | string;
}



export const SensorCard = ({ id, estado, temperatura_c, distacia_cm, fecha }: Props) => {


    return (

        <TouchableOpacity style={
            style.cardContainer
        }>

            <View
            >
                <Text style={style.name}>{estado}</Text>
                <Text style={style.name}>ID: {id}</Text>
                <Text style={style.temperature}>{temperatura_c}°C</Text>
                <Text>Distancia en centimetros: {distacia_cm}</Text>
                <Text>Fecha: {fecha} </Text>


            </View>

        </TouchableOpacity>

    );

}



const style = StyleSheet.create({
    cardContainer: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        borderColor: "blue",
        borderWidth: 2,
        width: 160,
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
        alignSelf: "center",
        fontWeight: "bold"
    },
    temperature: {
        color: "black",
        fontSize: 14,
        marginHorizontal: 10,
        marginTop: 5,
    },
});
