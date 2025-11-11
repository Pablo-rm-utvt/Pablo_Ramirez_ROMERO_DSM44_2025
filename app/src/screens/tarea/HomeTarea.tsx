import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { appTheme } from '../../themes/appTheme';
import { useTareaApi } from '../../hooks/useTareaApi';
import { TareaCard } from '../../components/TareaCard';
import { TareaResponse } from '../../interfaces/tareasInterfaces';
import { BtnTouch } from '../../components/BtnTouch';

export const HomeTarea = () => {

    const { isLoading, loadTarea, listTarea } = useTareaApi();

    const focused = useIsFocused();

    const navigation = useNavigation<any>();

    const create: TareaResponse = {
        id_tarea: 0,
        nombre: "",
        materia: "",
        fecha: "",
        prioridad: 0
    }

    useEffect(() => {
        (!isLoading) && loadTarea();
    }, [focused])

    return (
        <View
            style={appTheme.marginGlobal}
        >
            <FlatList
                data={Object.values(listTarea)}
                keyExtractor={(item) => "#" + item.id_tarea}
                ListHeaderComponent={(
                    <View
                        style={appTheme.container}
                    >
                        <Text
                            style={appTheme.title}
                        >
                            Lista de Tareas
                        </Text>
                        <BtnTouch
                            titulo='Crear tarea'
                            color='blue'
                            action={() => navigation.navigate("FormScreen", { ...create })}
                        />
                    </View>
                )}
                refreshControl={(
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={loadTarea}
                        colors={["pink", "violet", "black"]}
                        progressBackgroundColor="black"
                    />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <TareaCard
                        tarea={item}
                    />
                )}
            />
        </View>
    )
}