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
                <View style={style.containerimage}>
                    <Image style={style.image}

                        source={require("../../assets/empleado.png")}
                    />
                </View>
                <Text style={style.name}>{empleado.nombre} {empleado.apellido_p}</Text>
                <Text style={style.area}>Área: {empleado.area}</Text>
                <Text style={style.turno}>Turno: {empleado.turno}</Text>
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
        borderColor: "black",
        borderWidth: 2,
        width: 300,
        height: 100,
        marginTop: 20,
        marginBottom: 25,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#b3c8f4ff",
    },

    name: {
        fontSize: 20,
        marginHorizontal: 10,
        alignSelf: "flex-end",
        fontWeight: "bold",
        color: 'white',
        marginBottom: 10
    },
    containerimage: {
        alignItems: "center",
        backgroundColor: "white",
        position: "absolute",
        width: 90,
        height: 90,
        right: 200,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 80,
        marginBottom: 10
    },
    image: {
        alignSelf: "center",
        width: 60,
        height: 90,
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
