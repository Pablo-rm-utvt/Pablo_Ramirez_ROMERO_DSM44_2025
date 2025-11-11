import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import * as ImagePicker from "expo-image-picker";
import { File } from 'expo-file-system';
import { View, Text, Alert, Image } from 'react-native';
import { appTheme } from '../themes/appTheme';
import { BtnTouch } from '../components/BtnTouch';

export const ImagePickerScreen = () => {

    const { changeFavoriteImage } = useContext(AuthContext);

    const [imagen64, setImagen64] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permiso requerido",
                    "Debes otorgar el permiso para acceder a la galería de imágenes"
                );
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.9
        });

        (!result.canceled) && (() => {
            const file = new File(result.assets[0].uri);
            const base64 = file.base64Sync();
            setImagen64(base64);
            changeFavoriteImage(base64);
        })();
    }

    return (
        <View
            style={appTheme.marginGlobal}
        >
            <Text
                style={appTheme.title}
            >
                Selecciona tu imagen
            </Text>
            <BtnTouch
                titulo='Importar imagen'
                color='violet'
                action={() => pickImage()}
            />
            {
                (imagen64) && (
                    <View>
                        <Image
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 10,
                                borderColor: "black"
                            }}
                            source={{ uri: `data:image/jpeg;base64,${imagen64}` }}
                        />
                    </View>
                )
            }
        </View>
    );
}