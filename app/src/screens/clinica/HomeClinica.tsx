import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useClinicaApi } from '../../hooks/clinica/useClinicaApi';
import { PacienteCard } from '../../components/PacienteCard';
import { Fab } from '../../components/Fab';
import { RootStackParamList } from '../../interfaces/clinicaInterfaces';

type Props = StackScreenProps<RootStackParamList, 'HomeClinica'>;

export const HomeClinica = ({ navigation }: Props) => {
    const { pacientes, cargarPacientes } = useClinicaApi();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            cargarPacientes();
        });
        return unsubscribe;
    }, [navigation, cargarPacientes]);

    return (
        <View style={styles.container}>
            <FlatList
                data={pacientes}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <PacienteCard
                        paciente={item}
                        onPress={() =>
                            navigation.navigate('PacienteDetail', { paciente: item })
                        }
                    />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No hay pacientes registrados</Text>
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
    empty: {
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