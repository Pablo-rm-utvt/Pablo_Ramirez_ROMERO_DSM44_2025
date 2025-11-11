import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import useEmpleadoApi from '../hooks/useEmpleadoApi';
import EmpleadoCard from '../components/EmpleadoCard';

const EmpleadosList: React.FC<any> = ({ navigation }) => {
  const { listEmpleado: empleados, isLoading: loading, loadEmpleado: fetchAll } = useEmpleadoApi();

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Button title="Crear empleado" onPress={() => navigation.navigate('EmpleadoForm')} />
  {loading && <ActivityIndicator />}
      <FlatList
        data={empleados}
  keyExtractor={(item) => String(item.id_empleado)}
        renderItem={({ item }) => (
          <EmpleadoCard
            empleado={item}
            onPress={() => navigation.navigate('EmpleadoForm', item)}
          />
        )}
      />
    </View>
  );
};

export default EmpleadosList;
