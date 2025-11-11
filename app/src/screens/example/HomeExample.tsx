import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { appTheme } from '../../themes/appTheme';
import { useExampleApi } from '../../hooks/useExampleApi';
import { ExampleCard } from '../../components/ExampleCard';
import { FormDataExample } from '../../hooks/useExampleForm';
import { BtnTouch } from '../../components/BtnTouch';
import { RootStackParams } from '../../navigator/ExampleNavigator';

type HomeExampleNavigationProp = StackNavigationProp<RootStackParams, 'HomeExample'>;

export const HomeExample = () => {
    const { isLoading, loadExample, listExample } = useExampleApi();

    const focused = useIsFocused();
    const navigation = useNavigation<HomeExampleNavigationProp>();

    const create: FormDataExample = {
        id_example: 0,
        correo_example: "",
        nota_example: "",
        ciudad_example: "",
        proveedor_example: "",
        image1_example: "",
        image2_example: "",
        image3_example: "",
        prioridad_example: 0,
        updaate: new Date().toISOString()
    }

    useEffect(() => {
        (!isLoading) && loadExample();
    }, [focused])

    return (
        <View
            style={appTheme.marginGlobal}
        >
            <FlatList<FormDataExample>
                data={listExample}
                keyExtractor={(item) => "#" + item.id_example}
                ListHeaderComponent={(
                    <View style={appTheme.container}>
                        <Text style={appTheme.title}>
                            Lista de Ejemplos
                        </Text>
                        <BtnTouch

                            titulo='Crear ejemplo'
                            color='#baf6b2ff'
                            action={() => navigation.navigate("FormExample", create)}

                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ExampleCard example={item} />
                )}
            />
        </View>
    );
}