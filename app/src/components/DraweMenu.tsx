import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { appTheme } from '../themes/appTheme';

export const DrawerMenu = ({ navigation }: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView
            style={{
                flex: 1,
                backgroundColor: 'rgba(216, 255, 165, 0.95)', // Fondo semi-transparente
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
                        borderColor: "#40de91ff",
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
                    EJEMPLOS
                </Text>

                <View style={{ width: '85%', gap: 12 }}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('EmpleadoNavigator')}
                    >
                        <Text style={styles.menuButtonText}>Empleados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('PokemonNavigator')}
                    >
                        <Image
                            source={require("../../assets/pokfon.png")}
                            style={{ width: 230, height: 48, top: 1, borderRadius: 20, position: 'absolute' }}
                        />
                        <Text style={styles.menuButtonText}>Pokedex</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('CharactersNavigator')}
                    >
                        <Image
                            source={require("../../assets/rickfon.png")}
                            style={{ width: 230, height: 48, top: 1, borderRadius: 20, position: 'absolute' }}
                        />
                        <Text style={styles.menuButtonTextR}>Rick API</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('ExampleNavigator')}
                    >
                        <Image
                            source={require("../../assets/fondmy.png")}
                            style={{ width: 230, height: 48, top: 1, borderRadius: 20, position: 'absolute' }}
                        />
                        <Text style={styles.menuButtonText}>Ejemplo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('ClinicaNavigator')}
                    >
                        <Text style={styles.menuButtonText}>Clínica</Text>
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
