import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTypeColorStatus } from "../hooks/useTypeStatus";


interface Props {
    id: string;
    estado: string;
    temperatura_c: number;
    distacia_cm: number;
    fecha: any | string;
}



export const SensorCard = ({ id, estado, temperatura_c, distacia_cm, fecha }: Props) => {

    const { isLoading, color } = useTypeColorStatus(id);


    return (



        <View
            style={{ ...style.cardContainer, borderColor: (isLoading) ? color[1] : color }}
        >
            <Text style={{ ...style.name, color: (isLoading) ? color[1] : color }}>{estado}</Text>
            <Text style={style.id}>ID: </Text>
            <Text style={style.ide}> {id}</Text>
            <Text style={style.temperature}>Temperatura {temperatura_c}°C</Text>
            <Text style={style.cm}>Distancia en centimetros:</Text>

            <Text style={style.date}> {distacia_cm}</Text>
            <Text style={style.date}>Fecha: </Text>
            <Text style={style.date}> {fecha}</Text>

        </View>


    );

}



const style = StyleSheet.create({
    cardContainer: {
        shadowColor: "#000000ff",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 100,
        shadowRadius: 0,

        elevation: 8,

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
        backgroundColor: "black"
    },

    name: {
        fontSize: 18,
        marginHorizontal: 10,
        alignSelf: "center",
        fontWeight: "bold",
        color: 'white'
    },
    ide: {

        fontSize: 9,
        marginHorizontal: 10,
        alignSelf: "center",
        fontWeight: "bold",
        color: 'white'
    },

    id: {
        color: "white",
        fontSize: 12,
        marginHorizontal: 10,
        alignSelf: "center",
        fontWeight: "bold",

    },
    cm: {
        color: "white",
        fontSize: 10,
        marginHorizontal: 10,
        alignSelf: "center",
        fontWeight: "bold"
    },
    date: {
        color: "white",
        fontSize: 9,
        marginHorizontal: 10,
        alignSelf: "center",
        fontWeight: "bold"
    },
    temperature: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: 14,
        marginHorizontal: 10,
        marginTop: 5,
    },
});
