import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParams } from '../../navigator/StackNav';
import { StackScreenProps } from '@react-navigation/stack';
import { BtnTouch } from '../../components/BtnTouch';
import { Fab } from '../../components/Fab';

interface Props extends StackScreenProps<RootStackParams, "ScreenII"> { };

export const ScreenIII = ({ navigation }: Props) => {

    return (
        <View
            style={style.root}
        >
            <Text>
                ScreenIII
            </Text>
            <Fab
                titulo='<-'
                position="button_left"
                action={() => navigation.navigate("ScreenII")}
            />
            <BtnTouch
                titulo='Incio'
                color='pink'
                action={() => navigation.popToTop()}
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