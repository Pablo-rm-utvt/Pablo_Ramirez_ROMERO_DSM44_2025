import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, Image } from 'react-native';
import useEmpleadoApi from '../hooks/useEmpleadoApi';

const EmpleadoDetail: React.FC<any> = ({ route, navigation }) => {
    const { id } = route.params || {};
    const { findEmpleado, removeById } = useEmpleadoApi();
    const [empleado, setEmpleado] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await findEmpleado(id);
            setEmpleado(data);
            setLoading(false);
        };
        if (id) load();
    }, [id]);

    const onDelete = async () => {
        Alert.alert('Confirmar', 'Eliminar empleado?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await removeById(id);
                        Alert.alert('Eliminado', 'Empleado eliminado correctamente');
                        navigation.goBack();
                    } catch (err: any) {
                        console.error('[EmpleadoDetail] Error al eliminar:', err);
                        Alert.alert('Error', err?.message || 'No se pudo eliminar el empleado');
                    }
                },
            },
        ]);
    };

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    if (!empleado) return <Text style={{ padding: 12 }}>No encontrado</Text>;

    return (
        <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>{empleado.nombre}</Text>
                {empleado.foto_perfil ? (
                    <Image source={{ uri: `data:image/jpeg;base64,${empleado.foto_perfil}` }} style={{ width: 160, height: 160, marginVertical: 8 }} />
                ) : null}
                <Text>{empleado.cargo} - {empleado.area || ''}</Text>
                <Text>{empleado.correo}</Text>
                <Text>Tel: {String(empleado.telefono || '')}</Text>
                <View style={{ marginTop: 12 }}>
                    <Button title="Editar" onPress={() => navigation.navigate('EmpleadoForm', empleado)} />
                    <View style={{ height: 8 }} />
                    <Button title="Eliminar" onPress={onDelete} color="red" />
                </View>
            </View>
    );
};

export default EmpleadoDetail;
