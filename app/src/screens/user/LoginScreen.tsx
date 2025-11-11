import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, Animated } from 'react-native';
import { useLoginUser } from '../../hooks/useLoginUser';
import { appTheme } from '../../themes/appTheme';

export const LoginScreen = () => {

    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(progress, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: false,
                }),
                Animated.timing(progress, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    const animatedBorderColor = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["#FFFFFF", "#EE82EE"],
    });

    const {
        isLoading,
        state,
        handleInputChange,
        handleLogin,
        request
    } = useLoginUser();

    return (
        <View
            style={{
                ...appTheme.marginGlobal,
            }}
        >
            <View
                style={{ alignItems: "center" }}
            >
                <Animated.View
                    style={{
                        borderWidth: 10,
                        borderRadius: 30,
                        borderColor: animatedBorderColor
                    }}
                >
                    <Image
                        source={require("./../../../assets/login.png")}
                        style={{
                            width: 200,
                            height: 200,
                            borderColor: "violet",
                            borderRadius: 25,
                        }}
                    />
                </Animated.View>
                {
                    (isLoading) &&
                    <ActivityIndicator
                        style={{ height: 100 }}
                        size={100}
                        color="purple"
                    />
                }
                {
                    (request === false) &&
                    <Text
                        style={{ fontSize: 30, color: "pink", fontWeight: "bold" }}
                    >
                        {'Contraseña incorrecta \n'}
                        {'Envío de datos faltantes \n'}
                    </Text>
                }
                <TextInput
                    style={appTheme.textInput}
                    value={state.email}
                    onChangeText={(text) => handleInputChange("email", text)}
                    placeholder='E-mail'
                    keyboardType="email-address"
                    editable={!isLoading}
                />
                <TextInput
                    style={appTheme.textInput}
                    value={state.password}
                    secureTextEntry={true}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholder='Contraseña'
                    editable={!isLoading}
                />
                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <View
                        style={{
                            backgroundColor: "purple",
                            height: 50,
                            width: 100,
                            justifyContent: "center",
                            borderRadius: 20
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                color: "white",
                                alignSelf: "center"
                            }}
                        >
                            Login
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

}