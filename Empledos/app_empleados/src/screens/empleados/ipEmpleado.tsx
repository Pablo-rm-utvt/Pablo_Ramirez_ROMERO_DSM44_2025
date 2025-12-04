import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { ConfigIp } from "../../context/authContext";

export const IpEmpleado = ({ navigation }: any) => {
    const { apiIp, setApi } = useContext(ConfigIp);
    const [ip, setIp] = useState(apiIp);

    const handleSave = () => {
        setApi(ip);
        navigation.navigate("EmpleadoNavigator");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurar IP</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu IP"
                value={ip}
                onChangeText={setIp}
                placeholderTextColor={"#999"}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#40de91',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});