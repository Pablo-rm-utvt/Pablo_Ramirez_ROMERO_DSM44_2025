import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const useImagePicker = () => {

    const pickImage = async (): Promise<string | null> => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permisos requeridos",
                    "Se requieren permisos para acceder a la galería",
                    [{ text: "Aceptar" }]
                );
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.3,
                base64: true,
            });

            if (!result.canceled && result.assets[0]) {
                // Si ya viene con base64, la regresamos
                if (result.assets[0].base64) {
                    return result.assets[0].base64;
                }

                // Si no, la convertimos
                const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                    encoding: "base64",
                });
                return base64;
            }

            return null;

        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "No se pudo cargar la imagen");
            return null;
        }
    };

    return { pickImage };
};
