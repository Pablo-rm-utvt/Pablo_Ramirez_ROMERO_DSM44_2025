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
                    <View>
                        <Text
                            style={{ fontSize: 60, marginHorizontal: 10 }}
                        >
                            Sensor
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
                            color="pink"
                        />
                    ) : null
                }
            />
        </View>
    );
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});