import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParams } from '../../navigator/StackNav';
import { StackScreenProps } from '@react-navigation/stack';
import { Fab } from '../../components/Fab';

interface Props extends StackScreenProps<RootStackParams, "ScreenII"> { };

export const ScreenII = ({ navigation }: Props) => {

    return (
        <View
            style={style.root}
        >
            <Text>
                ScreenII
            </Text>
            <Fab
                titulo='->'
                position='button_right'
                action={() => navigation.navigate("ScreenIII")}
            />
            <Fab
                titulo='<-'
                position="button_left"
                action={() => navigation.navigate("ScreenI")}
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