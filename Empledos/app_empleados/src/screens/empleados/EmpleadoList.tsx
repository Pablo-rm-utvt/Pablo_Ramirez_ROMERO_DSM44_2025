import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEmpleadoPaginated } from '../../hooks/empleados/useEmpleadoPaginated';
import { EmpleadoCard } from '../../components/EmpleadoCard';
import { ConfigIp } from '../../context/authContext';



export const EmpleadoListScreen = () => {

    const { apiIp } = useContext(ConfigIp);
    const { loadEmployees, simpleEmpleadosList, isLoading } = useEmpleadoPaginated(apiIp);

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
                onEndReached={loadEmployees}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                    isLoading ? (
                        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>

                            <Image
                                source={require('../../../assets/trabajo.gif')}
                                style={{ alignSelf: "center", borderRadius: 50, height: 100, width: 100 }}
                            />
                            <Text>Cargando empleados...</Text>

                        </View>
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