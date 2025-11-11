import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParams } from '../../navigator/StackNav';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnTouch } from '../../components/BtnTouch';


interface Props extends StackScreenProps<RootStackParams, "UserScreen"> { }

export const UserScreen = ({ navigation, route }: Props) => {
    const { username, id_user, status } = route.params;
    return (
        <View style={style.root}>
            <Text>
                Username: {username}
            </Text>
            <Text>
                Id_user: {id_user}
            </Text>
            <Text>
                Status: {status ? "Activo" : "Inactivo"}
            </Text>
            <BtnTouch
                titulo='<-'
                color='pink'
                action={() => navigation.popToTop()}
            />
        </View>
    );
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }
});