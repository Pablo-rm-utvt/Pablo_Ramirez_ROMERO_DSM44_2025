import React, { useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import { useFormE, FormDataExample } from '../../hooks/useExampleForm';
import { useExampleApi } from '../../hooks/useExampleApi';
import { useImagePicker } from '../../hooks/useImagePicker';

interface Props {
    navigation: any;
    route: { params?: FormDataExample }
}

export const FormExample = ({ navigation, route }: Props) => {

    const { form, handleInputChange } = useFormE();
    const { createExample, updateExample, deleteExample } = useExampleApi();
    const { pickImage } = useImagePicker();

    useEffect(() => {
        const example = route.params;
        if (example) {
            handleInputChange('id_example', String(example.id_example));
            handleInputChange('correo_example', example.correo_example || '');
            handleInputChange('nota_example', example.nota_example || '');
            handleInputChange('ciudad_example', example.ciudad_example || '');
            handleInputChange('proveedor_example', example.proveedor_example || '');
            handleInputChange('image1_example', example.image1_example || '');
            handleInputChange('image2_example', example.image2_example || '');
            handleInputChange('image3_example', example.image3_example || '');
            handleInputChange('prioridad_example', String(example.prioridad_example || 0));
        }
    }, []);

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.mainTitle}>Formulario Example</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Correo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='correo@ejemplo.com'
                        value={form.correo_example}
                        onChangeText={(v) => handleInputChange('correo_example', v)}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />

                    <Text style={styles.label}>Nota</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nota'
                        value={form.nota_example}
                        onChangeText={(v) => handleInputChange('nota_example', v)}
                        multiline
                    />

                    <Text style={styles.label}>Ciudad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ciudad'
                        value={form.ciudad_example}
                        onChangeText={(v) => handleInputChange('ciudad_example', v)}
                    />

                    <Text style={styles.label}>Proveedor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Proveedor'
                        value={form.proveedor_example}
                        onChangeText={(v) => handleInputChange('proveedor_example', v)}
                    />

                    <Text style={styles.label}>Prioridad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='0'
                        value={String(form.prioridad_example)}
                        onChangeText={(v) => handleInputChange('prioridad_example', v)}
                        keyboardType='number-pad'
                    />

                    <Text style={styles.imageSectionTitle}>Imágenes</Text>

                    {[1, 2, 3].map((num) => (
                        <View key={num} style={styles.imageContainer}>
                            <Text style={styles.label}>Imagen {num}</Text>
                            <BtnTouch
                                titulo={form[`image${num}_example` as keyof FormDataExample] ? `Cambiar imagen ${num}` : `Seleccionar imagen ${num}`}
                                color='olive'
                                action={async () => {
                                    const base64 = await pickImage();
                                    if (base64) {
                                        handleInputChange(`image${num}_example` as keyof FormDataExample, base64);
                                    }
                                }}
                            />
                            {form[`image${num}_example` as keyof FormDataExample] && (
                                <View style={styles.imageWrapper}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: `data:image/jpeg;base64,${form[`image${num}_example` as keyof FormDataExample]}` }}
                                    />
                                </View>
                            )}
                        </View>
                    ))}

                    <View style={styles.buttonContainer}>
                        <BtnTouch
                            titulo={form.id_example == 0 ? 'Crear' : 'Actualizar'}
                            color='violet'
                            action={async () => {
                                if (form.id_example == 0) await createExample(form);
                                else await updateExample(form);
                                navigation.popToTop();
                            }}
                        />

                        {form.id_example !== 0 && (
                            <BtnTouch
                                titulo='Eliminar'
                                color='#ff4444'
                                action={async () => {
                                    await deleteExample(form);
                                    navigation.popToTop();
                                }}
                            />
                        )}

                        <BtnTouch
                            titulo='Regresar'
                            color='gray'
                            action={() => navigation.popToTop()}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#f5f5f5' },
    scrollContainer: { flexGrow: 1, padding: 16 },
    mainTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
    formContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 16, elevation: 4 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
    input: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#ddd' },
    imageSectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
    imageContainer: { marginBottom: 20 },
    imageWrapper: { alignItems: 'center', marginTop: 12, backgroundColor: '#f9f9f9', padding: 8, borderRadius: 8 },
    image: { width: 200, height: 200, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
    buttonContainer: { marginTop: 20, gap: 12 }
});
