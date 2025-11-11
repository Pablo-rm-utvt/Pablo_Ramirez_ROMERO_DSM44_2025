import React from "react";
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from "../navigator/PokemonNavigator";
import { useTypeColorPokemon } from "../hooks/useTypeColorPokemon";

interface Props {
    id: number | string;
    name: string;
    picture: string;
    url: string;
}

// 👇 Tipamos la navegación
type NavigationProp = StackNavigationProp<RootStackParams, "HomePokemon">;

export const PokemonCard = ({ id, name, picture, url }: Props) => {
    const widthDimensions = Dimensions.get("window").width;

    const navigation = useNavigation<NavigationProp>();

    const { isLoading, color } = useTypeColorPokemon(id);

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("PokemonScreen", { id, name, picture, url })
            }
        >
            <View
                style={{
                    ...style.cardContainer,
                    width: widthDimensions * 0.4,
                }}
            >
                <View
                    style={{
                        ...style.backgroundTop,
                        backgroundColor: isLoading
                            ? "gray"
                            : color.length > 1
                                ? color[1]
                                : color[0],
                    }}
                />
                <View
                    style={{
                        ...style.backgroundButtom,
                        backgroundColor: isLoading ? "gray" : color[0],
                    }}
                />
                <Image
                    style={style.pokeball}
                    source={require("../../assets/pokeball-light.png")} // ✅ corregido nombre del asset
                />
                <Image style={style.pokemon} source={{ uri: picture }} />
                <Text style={style.name}>
                    {`${name}`}
                    {`\n#${id}`}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        width: 120,
        height: 120,
        marginBottom: 25,
        borderRadius: 20,
        overflow: "hidden",
    },
    backgroundTop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: "50%",
        backgroundColor: "pink",
        transform: [{ rotateX: "20deg" }, { rotateY: "-40deg" }, { scale: 2 }],
    },
    backgroundButtom: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "gray",
        transform: [{ rotateX: "20deg" }, { rotateY: "-40deg" }, { scale: 2 }],
    },
    name: {
        color: "white",
        fontSize: 18,
        marginHorizontal: 10,
    },
    pokeball: {
        height: 120,
        width: 120,
        position: "absolute",
        bottom: -20,
        right: -20,
        opacity: 0.5,
    },
    pokemon: {
        width: 90,
        height: 90,
        position: "absolute",
        right: -8,
        bottom: -5,
    },
});
