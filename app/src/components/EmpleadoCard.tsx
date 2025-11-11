import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
  empleado: any;
  onPress?: () => void;
};

export const EmpleadoCard: React.FC<Props> = ({ empleado, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {empleado.foto_perfil ? (
          <Image source={{ uri: `data:image/jpeg;base64,${empleado.foto_perfil}` }} style={styles.avatar} />
        ) : null}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{empleado.nombre}</Text>
          <Text style={styles.subtitle}>{empleado.cargo} • {empleado.area || ''}</Text>
          <Text style={styles.small}>{empleado.correo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 13, color: '#555' },
  small: { fontSize: 12, color: '#777' },
  avatar: { width: 56, height: 56, borderRadius: 28 },
});

export default EmpleadoCard;