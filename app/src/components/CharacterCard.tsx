import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigator/CharactersNavigator';

interface CharacterCardProps {
    id: number;
    name: string;
    image: string;
    status: string;
};

export const CharacterCard = ({ id, name, image, status }: CharacterCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Character", { id })}
        >
            <View>
                <Image source={{ uri: image }} style={styles.image} />
                <Image source={require("../../assets/log-unscreen.gif")} style={styles.backimage} />

                <Text style={styles.title}>{name}</Text>
                <Text style={styles.title}>ID: {id}</Text>
                <Text style={styles.title}>Status: {status}</Text>

            </View>


        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {

        height: 200,
        width: 160,
        margin: 5,
        backgroundColor: '#000000ff',
        borderRadius: 50,
        borderColor: "green",
        borderWidth: 4,
        alignSelf: "center",
        alignContent: "center",
        left: -5,
        marginLeft: 3,
        opacity: 20

    },
    image: {
        width: 80,
        height: 90,
        borderRadius: 30,
        position: "absolute",
        marginRight: 5,
        bottom: -130,
        left: 60
    },
    backimage: {
        right: 100,
        width: 60,
        height: 60,
        bottom: -120,
        left: 5,
        position: "absolute",
    },
    title: {
        left: 12,
        bottom: -18,
        fontSize: 12,
        fontWeight: 'bold',
        color: "white"
    }
});
