import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Datum } from "../interfaces/empleadosInterface";


interface Props {
    empleado: Datum | any;
}



export const EmpleadoCard = ({ empleado }: Props) => {
    const navigation = useNavigation<any>();

    const handlePress = () => {
        navigation.navigate('EmpleadoDetail', { empleado });
    };

    return (
        <TouchableOpacity onPress={handlePress}>

            <View style={style.cardContainer}>

                <Image style={style.image}

                    source={require("../../assets/empleado.png")}
                />
                <Text style={style.name}>{empleado.nombre} {empleado.apellido_p}</Text>
                <Text style={style.area}>Área: {empleado.area}</Text>
                <Text style={style.turno}>Turno: {empleado.turno}</Text>
            </View>
        </TouchableOpacity>
    );

}


const style = StyleSheet.create({
    cardContainer: {
        shadowColor: "#6d8ae9ff",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        borderColor: "black",
        borderWidth: 2,
        width: 300,
        height: 100,
        marginTop: 20,
        marginBottom: 25,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#55a0f6ff",
    },

    name: {
        fontSize: 20,
        marginHorizontal: 10,
        alignSelf: "flex-end",
        fontWeight: "bold",
        color: 'white',
        marginBottom: 10
    },
    image: {
        position: "absolute",
        width: 60,
        height: 90,
        right: 220,
        marginLeft: 10,
        marginTop: 10
    },
    area: {
        color: "white",
        fontSize: 12,
        marginHorizontal: 10,
        alignSelf: "flex-end",
        fontWeight: "bold",
        marginBottom: 8
    },
    turno: {
        color: "white",
        fontSize: 12,
        marginHorizontal: 10,
        alignSelf: "flex-end",
        fontWeight: "bold"
    }
});
