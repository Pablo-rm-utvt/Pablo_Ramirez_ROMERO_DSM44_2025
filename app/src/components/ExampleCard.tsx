import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { UseExample } from '../interfaces/exampleInterfaces';

type RootStackParamList = {
    FormExample: {

        id_example: number;
        correo_example: string;
        nota_example: string;
        ciudad_example: string;
        proveedor_example: string;
        image1_example: string;
        image2_example: string;
        image3_example: string;
        prioridad_example: number;
        updaate: string;
    };
    FormScreen: Record<string, any>;
    Character: { id_example: number };
};

interface Props {
    example: UseExample;
}

export const ExampleCard = ({ example }: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("FormExample", { ...example })}
            activeOpacity={0.7}
        >
            <View style={style.cardContainer}>
                <View style={style.contentContainer}>
                    <Text style={style.title}>
                        Correo:
                    </Text>
                    <Text style={style.content}>
                        {example.correo_example || 'N/A'}
                    </Text>

                    <Text style={style.title}>
                        Ciudad:
                    </Text>
                    <Text style={style.content}>
                        {example.ciudad_example || 'N/A'}
                    </Text>

                    <Text style={style.title}>
                        Notas:
                    </Text>
                    <Text style={style.content}>
                        {example.nota_example || 'N/A'}
                    </Text>

                    <Text style={[style.content, { marginTop: 8, fontSize: 12 }]}>
                        Última actualización: {example.updaate || 'N/A'}
                    </Text>
                </View>

                <View style={style.imageContainer}>
                    {example.image1_example && (
                        <Image
                            style={style.avatar}
                            source={{ uri: `data:image/jpeg;base64,${example.image1_example}` }}
                        />
                    )}
                    {example.image2_example && (
                        <Image
                            style={style.avatar}
                            source={{ uri: `data:image/jpeg;base64,${example.image2_example}` }}
                        />
                    )}
                    {example.image3_example && (
                        <Image
                            style={style.avatar}
                            source={{ uri: `data:image/jpeg;base64,${example.image3_example}` }}
                        />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    cardContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        padding: 15,
        minHeight: 180,
        width: '95%',
        marginBottom: 25,
        borderRadius: 20,
        backgroundColor: "#93b5caff",
        flexDirection: 'column'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 15
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.3)'
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8
    },
    content: {
        color: "white",
        fontSize: 14,
        lineHeight: 20
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "white",
    }
});