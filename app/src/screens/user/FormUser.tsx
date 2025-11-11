import React, { useEffect } from 'react';
import { View, Text, TextInput, Image, Alert } from 'react-native';
import { appTheme } from '../../themes/appTheme';
import { BtnTouch } from '../../components/BtnTouch';
import { useFormUser } from '../../hooks/useFormUser';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/UserNavigator';
import { useImagePicker } from '../../hooks/useImagePicker';

interface Props extends StackScreenProps<RootStackParams, "FormUser"> { };

export const FormUser = ({ navigation, route }: Props) => {

    const { state, handleInputChange, handleSubmit, handleDelete } = useFormUser();
    const { imagen64, pickImage } = useImagePicker();

    useEffect(() => {
        const user = route.params;
        handleInputChange("id_user", user.id_user);
        handleInputChange("username", user.username);
        handleInputChange("email", user.email);
        handleInputChange("image", user.image);
        handleInputChange("update", user.update);
    }, []);

    useEffect(() => {
        imagen64 && handleInputChange("image", imagen64);
    }, [imagen64]);

    return (
        <View
            style={appTheme.marginGlobal}
        >
            <Text
                style={appTheme.title}
            >
                Formulario de usuarios
            </Text>
            {(state.id_user !== 0) && (
                <BtnTouch
                    titulo='Borrar Usuario'
                    color='red'
                    action={() => {
                        handleDelete();
                        navigation.popToTop();
                    }}
                />)
            }
            <View
                style={appTheme.container}
            >
                <Text
                    style={{
                        ...appTheme.title,
                        fontSize: 18,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginHorizontal: 5,
                        marginTop: 20
                    }}
                >
                    Nombre del usuario
                </Text>
                <TextInput
                    style={appTheme.textInput}
                    placeholder='Nombre del usuario'
                    value={state.username}
                    onChangeText={(value) => handleInputChange("username", value)}
                />
                <Text
                    style={{
                        ...appTheme.title,
                        fontSize: 18,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginHorizontal: 5,
                        marginTop: 5
                    }}
                >
                    Contraseña del usuario
                </Text>
                <TextInput
                    style={appTheme.textInput}
                    placeholder={(state.id_user === 0) ? "Ingresar contraseña" : "Actualizar contraseña"}
                    value={state.password}
                    onChangeText={(value) => handleInputChange("password", value)}
                    secureTextEntry={true}
                />
                <Text
                    style={{
                        ...appTheme.title,
                        fontSize: 18,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginHorizontal: 5,
                        marginTop: 5
                    }}
                >
                    Correo electrónico
                </Text>
                <TextInput
                    style={appTheme.textInput}
                    placeholder='Correo'
                    value={state.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    keyboardType="email-address"
                />
                <BtnTouch
                    titulo='Seleccionar imagen'
                    color='olive'
                    action={() => pickImage()}
                />
                {(state.image) && (
                    <Image
                        style={{
                            ...appTheme.avatar,
                            height: 200,
                            width: 200,
                        }}
                        source={{ uri: `data:image/jpeg;base64,${state.image}` }}
                    />)
                }
                <BtnTouch
                    titulo={(state.id_user !== 0) ? "Actualizar usuario" : "Crear usuario"}
                    color='violet'
                    action={() => {
                        handleSubmit();
                        navigation.popToTop();
                    }}
                />
                <BtnTouch
                    titulo='Regresar'
                    color='violet'
                    action={() => navigation.popToTop()}
                />
            </View>
        </View>
    )
}