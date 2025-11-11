import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    id: string | number;
    onEdit?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
};

export const PacienteActions: React.FC<Props> = ({ id, onEdit, onDelete }) => {
    const handleEdit = () => {
        if (onEdit) {
            onEdit(id);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    };

    return (
        <View style={styles.actions}>
            <TouchableOpacity onPress={handleEdit} style={[styles.actionButton, styles.editButton]}>
                <Text style={styles.actionButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: 'white',
    },
    actionButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#007AFF',
    },
    editButton: {
        borderRightWidth: 1,
        borderRightColor: '#f0f0f0',
    },
    deleteButtonText: {
        color: '#FF3B30',
    },
});