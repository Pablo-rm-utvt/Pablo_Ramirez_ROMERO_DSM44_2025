import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useClinicaApi } from '../../hooks/useClinicaApi';
import { PacienteCard } from '../../components/PacienteCard';
import { Fab } from '../../components/Fab';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/types';

type Props = StackScreenProps<RootStackParamList, 'HomeClinica'>;

export const HomeClinica = ({ navigation }: Props) => {
    const { isLoading, pacientes, loadPacientes } = useClinicaApi();

    // Efecto para recargar los datos cuando la pantalla obtiene el foco
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadPacientes();
        });

        return unsubscribe;
    }, [navigation, loadPacientes]);



    return (
        <View style={styles.container}>
            <FlatList
                data={pacientes}
                keyExtractor={(paciente) => paciente.id.toString()}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (
                    <PacienteCard
                        paciente={item}
                        onPress={() => {
                            navigation.navigate('PacienteDetail', { 
                                paciente: item 
                            });
                        }}
                    />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No hay pacientes registrados
                        </Text>
                    </View>
                )}
            />

            <Fab
                titulo="+"
                position="button_right"
                action={() => navigation.navigate('FormPaciente', {})}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 25,
        right: 25
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center'
    }
});