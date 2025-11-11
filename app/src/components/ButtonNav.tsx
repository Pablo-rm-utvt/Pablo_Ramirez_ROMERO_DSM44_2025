import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface Props_Butt {
    text: string;
    color: string
    action: () => void;
}

export const buttonNav = ({ text, color, action }: Props_Butt) => {
    return (
        <TouchableOpacity
            onPress={action}>

            <View
                style={{ backgroundColor: color }}>

                <Text>
                    {text}
                </Text>
            </View>

        </TouchableOpacity>
    )
}


