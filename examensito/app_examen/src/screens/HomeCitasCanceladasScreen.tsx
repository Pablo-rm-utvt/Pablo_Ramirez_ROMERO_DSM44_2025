import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useCitasCanceladas } from "../hooks/usePacientesData";

export const HomeCitasCanceladasScreen = () => {
    const { total, isLoading, loadCitasCanceladas } = useCitasCanceladas();

    useEffect(() => {
        loadCitasCanceladas();
    }, []);

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#3B82F6" />
            </View>
        );
    }

    return (
        <View style={style.root}>
            <View style={style.card}>
                <Text style={style.label}>Total Citas Canceladas</Text>
                <Text style={style.bigNumber}>{total || 0}</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderLeftWidth: 6,
        borderLeftColor: '#EF4444',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    bigNumber: {
        fontSize: 48,
        fontWeight: '700',
        color: '#EF4444',
    },
});
