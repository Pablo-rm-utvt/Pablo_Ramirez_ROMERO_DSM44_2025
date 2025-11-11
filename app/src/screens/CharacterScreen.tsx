import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../navigator/CharactersNavigator";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Character } from "../interfaces/characterInterfaces";

type CharacterRouteProp = RouteProp<RootStackParams, "Character">;

export const CharacterScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const { params } = useRoute<CharacterRouteProp>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            const resp = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
            const data: Character = await resp.json();
            setCharacter(data);
            setLoading(false);
        };
        fetchCharacter();
    }, [params.id]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size={40} style={{ flex: 1 }} />
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Image source={require("../../assets/return.png")} style={{ width: 50, right: 10, height: 50 }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Name: {character?.name}</Text>
                    <Text style={styles.title}>Status: {character?.status}</Text>
                    <Text style={styles.title}>Species: {character?.species}</Text>
                    <Text style={styles.title}>Gender: {character?.gender}</Text>
                    <Text style={styles.title}>Origin: {character?.origin?.name}</Text>
                    <Text style={styles.title}>Location: {character?.location?.name}</Text>
                    <Text style={styles.title}>Created: {character && new Date(character.created).toDateString()}</Text>
                    <Image source={require("../../assets/new.gif")} style={styles.back} />
                    <Image source={{ uri: character?.image }} style={styles.image} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black",
    },

    button: {
        margin: 20,
        width: 20,
        height: 20,
        top: 10,
        borderRadius: 10,
        left: 10,
        position: "absolute"
    },
    back: {
        width: 210,
        height: 210,
        borderRadius: 100,
        top: 70,
        marginBottom: 20,
        position: "absolute"
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 100,
        top: 100,
        marginBottom: 20,
        position: "absolute"
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "white",
        alignSelf: "center",
        margin: 10,
        top: 60
    }
});
