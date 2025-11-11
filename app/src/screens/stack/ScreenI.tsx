import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParams } from '../../navigator/StackNav';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';

interface Props extends StackScreenProps<RootStackParams, "ScreenI"> { };

interface User {
    username: string;
    id_user: number;
    status: boolean;
}

export const ScreenI = ({ navigation }: Props) => {

    const { authState, signIn, logout, changeUsername } = useContext(AuthContext);

    const usuario: User = {
        username: "Chucho Ivan",
        id_user: 25,
        status: false,
    }

    const usuario2: User = {
        username: "Irais",
        id_user: 26,
        status: true,
    }

    return (
        <View
            style={style.root}
        >
            <Text>
                ScreenI
            </Text>
            <BtnTouch
                titulo={(authState.isLoggedIn) ? "Cerrar sesión" : "Iniciar sesión"}
                color={(authState.isLoggedIn) ? "red" : "violet"}
                action={() => (authState.isLoggedIn) ? logout() : signIn()}
            />
            <BtnTouch
                titulo="Cambiar de username"
                color='violet'
                action={() => changeUsername("Rita Karla Rubí")}
            />
            <Fab
                titulo='->'
                position="button_right"
                action={() => navigation.navigate("ScreenII")}
            />
            <BtnTouch
                titulo={usuario.username}
                color='violet'
                action={() => navigation.navigate("UserScreen", usuario)}
            />
            <BtnTouch
                titulo={usuario2.username}
                color='violet'
                action={() => navigation.navigate("UserScreen", usuario2)}
            />
        </View>
    )
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
});