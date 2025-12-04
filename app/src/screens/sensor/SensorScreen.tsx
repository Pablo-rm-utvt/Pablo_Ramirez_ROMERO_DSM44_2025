import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useSensorPaginated } from '../../hooks/sensor/useSensorPaginated';
import { SensorCard } from '../../components/SensorCard';

export const SensorScreen = () => {
    const { loadSensor, simpleSensorList, estaCargando } = useSensorPaginated();

    return (
        <View
            style={style.root}
        >
            <FlatList
                data={simpleSensorList}
                keyExtractor={(sensor) => `${sensor.id}`}
                ListHeaderComponent={(
                    <View style={{ alignSelf: 'center', alignContent: 'center' }}>
                        <Text
                            style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}
                        >
                            Sensor Paginate
                        </Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <SensorCard
                        {...item}
                    />
                )}
                onEndReached={loadSensor}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                    estaCargando ? (
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
    root: {
        backgroundColor: '#ffffffff',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});