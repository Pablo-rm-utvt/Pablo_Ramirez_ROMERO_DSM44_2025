import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import useEmpleadoApi from '../../hooks/useEmpleadoApi';
import EmpleadoCard from '../../components/EmpleadoCard';
import { useIsFocused } from '@react-navigation/native';

const HomeEmpleado = ({ navigation, route }: any) => {
  const { isLoading, listEmpleado, loadEmpleado } = useEmpleadoApi();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadEmpleado();
    }
    // Also handle navigation param refresh
    if (route?.params?.refresh) {
      loadEmpleado();
    }
  }, [isFocused, route?.params?.refresh]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
  <BtnTouch titulo='Crear empleado' color='violet' action={() => navigation.navigate('EmpleadoForm')} />
      {isLoading && <ActivityIndicator />}
      <FlatList
        data={listEmpleado}
        keyExtractor={(item) => String(item.id_empleado)}
        renderItem={({ item }) => (
          <EmpleadoCard empleado={item} onPress={() => navigation.navigate('EmpleadoForm', item)} />
        )}
      />
    </View>
  );
};

export default HomeEmpleado;
