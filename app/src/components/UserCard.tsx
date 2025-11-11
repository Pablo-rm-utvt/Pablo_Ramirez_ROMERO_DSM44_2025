import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { UserResponse } from '../interfaces/userInterfaces';

type RootStackParamList = {
    FormUser: {
        id_user: number;
        username: string;
        email: string;
        password: string;
        image: string;
        update: string;
    };
    FormScreen: Record<string, any>;
    Character: { id: number };
};

interface Props {
    user: UserResponse;
}

export const UserCard = ({ user }: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("FormUser", { ...user })}
        >
            <View
                style={style.cardContainer}
            >
                <Text
                    style={style.title}
                >
                    {`Usuario: \n${user.username}\n`}
                </Text>
                <Text
                    style={style.content}
                >
                    {`Correo: \n${user.email}\n`}
                    {`Última actualización: \n${user.update}\n`}
                </Text>
                <Image
                    style={style.avatar}
                    source={{ uri: `data:image/jpeg;base64,${user.image}` }}
                />
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    avatar: {
        top: -10,
        right: -10,
        height: 70,
        width: 70,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white",
        position: "absolute"
    },
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 180,
        marginBottom: 25,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "violet",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    title: {
        marginTop: 10,
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    content: {
        marginTop: 10,
        color: "white",
        fontSize: 11,
        textAlign: "center"
    },
});