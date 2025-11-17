import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useSensorPaginated } from '../../hooks/useSensorPaginated';
import { SensorCard } from '../../components/SensorCard';

export const SensorScreen = () => {

    const { loadSensor, simpleSensorList, isLoading } = useSensorPaginated();

    return (
        <View
            style={style.root}
        >
            <FlatList
                data={simpleSensorList}
                keyExtractor={(sensor) => `${sensor.id}`}
                // Header
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
                numColumns={2} // Ojo si lo cambio debo reiniciar el app
                renderItem={({ item }) => (
                    <SensorCard
                        {...item}
                    />
                )}
                onEndReached={loadSensor}
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
    root: {
        backgroundColor: '#ffffffff',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});