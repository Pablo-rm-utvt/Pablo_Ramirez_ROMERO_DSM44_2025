import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { appTheme } from '../themes/appTheme';

export const DrawerMenu = ({ navigation }: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView
            style={{
                flex: 1,
                backgroundColor: 'rgba(213, 242, 255, 0.95)',
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
                opacity: 0.98,
            }}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
                opacity: 0.98,
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                    paddingVertical: 30,

                }}
            >
                <Image
                    style={{
                        ...appTheme.avatar,
                        borderColor: "#000000ff",
                        marginBottom: 20,
                    }}
                    source={require('../../assets/zys.gif')}
                />

                <Text
                    style={{
                        ...appTheme.title,
                        marginBottom: 25,
                        textAlign: 'center',
                        fontSize: 24,
                        color: '#333'
                    }}
                >
                    EMPLEADOS
                </Text>


                <View style={{ width: '85%', gap: 12 }}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('IpEmpleado')}
                    >

                        <Text style={styles.menuButtonText}> Direccion Ip</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('EmpleadoNavigator')}
                    >
                        <Text style={styles.menuButtonText}>Empleados Listados</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: 'rgba(100, 100, 100, 0.1)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    menuButtonText: {
        alignContent: "flex-start",
        alignSelf: "flex-start",
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    menuButtonTextR: {
        alignContent: "flex-start",
        alignSelf: "flex-end",
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffffff',

    }
});
