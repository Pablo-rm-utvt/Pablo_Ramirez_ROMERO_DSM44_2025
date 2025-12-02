import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useEmpleadoPaginated } from '../../hooks/empleados/useEmpleadoPaginated';
import { EmpleadoCard } from '../../components/EmpleadoCard';

export const EmpleadoListScreen = () => {

    const { loadEmpleados, simpleEmpleadosList, isLoading } = useEmpleadoPaginated();

    return (
        <View
            style={style.screen}
        >
            <FlatList
                data={simpleEmpleadosList}
                keyExtractor={(empleado) => `${empleado.id_empleado}`}

                ListHeaderComponent={(
                    <View style={{ alignSelf: 'center', alignContent: 'center' }}>
                        <Text
                            style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}
                        >
                            Empleados
                        </Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                renderItem={({ item }) => (
                    <EmpleadoCard
                        empleado={item}
                    />
                )}
                onEndReached={loadEmpleados}
                onEndReachedThreshold={0.2}
                // Footer
                ListFooterComponent={
                    isLoading ? (
                        <ActivityIndicator
                            style={{ height: 120 }}
                            size={60}
                            color="blue"
                        />
                    ) : null
                }
            />
        </View>
    );
}

const style = StyleSheet.create({
    screen: {
        backgroundColor: '#ffffffff',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});