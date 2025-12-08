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
            <View style={{ borderColor: "#63c9edff", borderWidth: 2, padding: 20, borderRadius: 10 }}>
                <Text style={styles.title}>Configurar IP</Text>
                <Text style={{ textAlign: "center", alignSelf: "center" }}>Cambia solamente "localhost" por La IP del servidor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu IP"
                    value={ip}
                    onChangeText={setIp}
                    placeholderTextColor={"#999"}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>

            </View>
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
        bottom: 0,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        fontFamily: "Italic",
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        alignSelf: 'center',
        width: 100,
        backgroundColor: '#63c9edff',
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