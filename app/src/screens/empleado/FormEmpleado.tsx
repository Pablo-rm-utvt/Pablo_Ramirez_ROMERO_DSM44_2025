import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { BtnTouch } from '../../components/BtnTouch';
import useFormEmpleado from '../../hooks/useFormEmpleado';
import { useEmpleadoApi } from '../../hooks/useEmpleadoApi';
import { useImagePicker } from '../../hooks/useImagePicker';
import { empleadosApi, updateEmpleado as apiUpdateEmpleado } from '../../api/empleadosApi';

interface Props {
  navigation: any;
  route: { params?: any };
}

export const FormEmpleado = ({ navigation, route }: Props) => {
  const { state, handleInputChange, handleSubmit } = useFormEmpleado();
  const { createEmpleado, updateEmpleado, removeById } = useEmpleadoApi();
  const { pickImage } = useImagePicker();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Helper to perform deletion (used by Alert and by debug button)
  const handleDeleteConfirmed = async () => {
    try {
      console.log('[FormEmpleado] handleDeleteConfirmed: iniciando eliminación id=', state.id_empleado);
      await removeById(Number(state.id_empleado));
      console.log('[FormEmpleado] handleDeleteConfirmed: eliminado correctamente');
      navigation.replace('EmpleadosList', { refresh: true });
    } catch (err: any) {
      console.error('[FormEmpleado] handleDeleteConfirmed error:', err);
    }
  };

  useEffect(() => {
    const raw = route.params;
    console.log('[FormEmpleado] Datos recibidos raw:', raw);
    const empleado = raw && (raw as any).empleado ? (raw as any).empleado : raw;
    if (empleado && typeof empleado === 'object') {
      // Map fields from empleado param into form state
      Object.keys(empleado).forEach((k) => {
        // @ts-ignore
        handleInputChange(k as any, (empleado as any)[k]);
      });
      console.log('[FormEmpleado] Estado después de cargar:', empleado);
    }
    // re-run when route params change
  }, [route.params]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>Formulario Empleado</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} placeholder='Nombre' value={state.nombre} onChangeText={(v) => handleInputChange('nombre', v)} />

          <Text style={styles.label}>CURP</Text>
          <TextInput style={styles.input} placeholder='CURP' value={state.curp} onChangeText={(v) => handleInputChange('curp', v)} />

          <Text style={styles.label}>RFC</Text>
          <TextInput style={styles.input} placeholder='RFC' value={state.rfc} onChangeText={(v) => handleInputChange('rfc', v)} />

          <Text style={styles.label}>NSS</Text>
          <TextInput style={styles.input} placeholder='NSS' value={state.nss} onChangeText={(v) => handleInputChange('nss', v)} keyboardType='number-pad' />

          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TextInput style={styles.input} placeholder='YYYY-MM-DD' value={state.fecha_nacimiento} onChangeText={(v) => handleInputChange('fecha_nacimiento', v)} />

          <Text style={styles.label}>Dirección</Text>
          <TextInput style={styles.input} placeholder='Dirección' value={state.direccion} onChangeText={(v) => handleInputChange('direccion', v)} />

          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} placeholder='correo@ejemplo.com' value={state.correo} onChangeText={(v) => handleInputChange('correo', v)} keyboardType='email-address' autoCapitalize='none' />

          <Text style={styles.label}>Cargo</Text>
          <TextInput style={styles.input} placeholder='Cargo' value={state.cargo} onChangeText={(v) => handleInputChange('cargo', v)} />

          <Text style={styles.label}>Área</Text>
          <TextInput style={styles.input} placeholder='Área' value={state.area} onChangeText={(v) => handleInputChange('area', v)} />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput style={styles.input} placeholder='Teléfono' value={String(state.telefono)} onChangeText={(v) => handleInputChange('telefono', v)} keyboardType='phone-pad' />

          <Text style={styles.label}>Contacto extra</Text>
          <TextInput style={styles.input} placeholder='Contacto extra' value={String((state as any).contacto_exta || '')} onChangeText={(v) => handleInputChange('contacto_exta', v)} keyboardType='phone-pad' />

          <Text style={styles.label}>Fecha de ingreso</Text>
          <TextInput style={styles.input} placeholder='YYYY-MM-DD' value={String(state.fecha_ingreso || '')} onChangeText={(v) => handleInputChange('fecha_ingreso', v)} />

          <Text style={styles.label}>Cuenta bancaria</Text>
          <TextInput style={styles.input} placeholder='Número de cuenta' value={String(state.cuenta_bancaria || '')} onChangeText={(v) => handleInputChange('cuenta_bancaria', v)} keyboardType='number-pad' />

          <Text style={styles.label}>Estado civil</Text>
          <TextInput style={styles.input} placeholder='Estado civil' value={String(state.estado_civil || '')} onChangeText={(v) => handleInputChange('estado_civil', v)} />

          <Text style={styles.label}>Estudios</Text>
          <TextInput style={styles.input} placeholder='Nivel de estudios' value={String(state.estudios || '')} onChangeText={(v) => handleInputChange('estudios', v)} />

          <Text style={styles.imageSectionTitle}>Imagen de perfil</Text>
          <BtnTouch titulo='Seleccionar de galería' color='olive' action={async () => {
            const b64 = await pickImage();
            if (b64) handleInputChange('foto_perfil', b64);
          }} />

          {state.foto_perfil ? (
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${state.foto_perfil}` }} />
            </View>
          ) : null}

          <Text style={{ marginTop: 12, fontWeight: '600' }}>Documentos (INE, comprobantes)</Text>
          <View style={{ marginTop: 8 }} />
          <BtnTouch titulo='INE anverso' color='olive' action={async () => { const b64 = await pickImage(); if (b64) handleInputChange('ine_anversa', b64); }} />
          {state.ine_anversa ? <Image source={{ uri: `data:image/jpeg;base64,${state.ine_anversa}` }} style={{ width: 120, height: 80, marginTop: 8 }} /> : null}
          <View style={{ height: 8 }} />
          <BtnTouch titulo='INE reverso' color='olive' action={async () => { const b64 = await pickImage(); if (b64) handleInputChange('ine_reverso', b64); }} />
          {state.ine_reverso ? <Image source={{ uri: `data:image/jpeg;base64,${state.ine_reverso}` }} style={{ width: 120, height: 80, marginTop: 8 }} /> : null}
          <View style={{ height: 8 }} />
          <BtnTouch titulo='Comprobante domicilio' color='olive' action={async () => { const b64 = await pickImage(); if (b64) handleInputChange('comprobante_domicilio', b64); }} />
          {state.comprobante_domicilio ? <Image source={{ uri: `data:image/jpeg;base64,${state.comprobante_domicilio}` }} style={{ width: 120, height: 80, marginTop: 8 }} /> : null}
          <View style={{ height: 8 }} />
          <BtnTouch titulo='Constancia fiscal' color='olive' action={async () => { const b64 = await pickImage(); if (b64) handleInputChange('constancia_fiscal', b64); }} />
          {state.constancia_fiscal ? <Image source={{ uri: `data:image/jpeg;base64,${state.constancia_fiscal}` }} style={{ width: 120, height: 80, marginTop: 8 }} /> : null}
          <View style={{ height: 8 }} />
          <BtnTouch titulo='Acta de nacimiento' color='olive' action={async () => { const b64 = await pickImage(); if (b64) handleInputChange('acta_nacimiento', b64); }} />
          {state.acta_nacimiento ? <Image source={{ uri: `data:image/jpeg;base64,${state.acta_nacimiento}` }} style={{ width: 120, height: 80, marginTop: 8 }} /> : null}

          <View style={styles.buttonContainer}>
            <BtnTouch
              titulo={state.id_empleado == 0 ? 'Crear' : 'Actualizar'}
              color='violet'
              action={async () => {
                // Validaciones simples
                if (!state.nombre || state.nombre.trim().length < 2) { Alert.alert('Validación', 'El nombre es requerido y debe tener al menos 2 caracteres'); return; }
                if (state.correo && !state.correo.includes('@')) { Alert.alert('Validación', 'Correo inválido'); return; }
                if (state.telefono) {
                  const tel = String(state.telefono).replace(/\D/g, '');
                  if (tel.length < 7) { Alert.alert('Validación', 'Teléfono inválido'); return; }
                }

                try {
                  // Loguear payload para depuración
                  console.log('[FormEmpleado] submitting state:', state);

                  // Construir payload limpiando campos vacíos (evita enviar empty strings)
                  const payload: any = {};
                  Object.keys(state).forEach((k) => {
                    const val: any = (state as any)[k];
                    if (val !== '' && val !== null && val !== undefined) payload[k] = val;
                  });

                  // Llamar al handler del form (create o update) y esperar resultado
                  const res = await handleSubmit();
                  const empleadoId = (res && (res.id_empleado || res.id)) ? (res.id_empleado || res.id) : (state.id_empleado || 0);

                  // Subir documentos e imagenes si existen
                  if (empleadoId && empleadoId !== 0) {
                    const docFields = ['foto_perfil', 'ine_anversa', 'ine_reverso', 'comprobante_domicilio', 'constancia_fiscal', 'acta_nacimiento'];
                    for (const f of docFields) {
                      const v = (state as any)[f];
                      if (v) {
                        try {
                          // subir solo el campo de documento usando la ruta correcta
                          await apiUpdateEmpleado(empleadoId, { [f]: v });
                        } catch (err) {
                          console.warn(`Error subiendo ${f}`, err);
                        }
                      }
                    }
                  }

                  // Replace current screen with EmpleadosList and signal refresh
                  navigation.replace('EmpleadosList', { refresh: true });
                } catch (err: any) {
                  const e: any = err;
                  console.error('submit error', e?.response?.data || e?.message || e);
                  Alert.alert('Error', (e?.response?.data && JSON.stringify(e.response.data)) || e?.message || 'No se pudo guardar el empleado');
                }
              }}
            />

            {(state.id_empleado !== 0) && (
              <BtnTouch
                titulo='Borrar'
                color='red'
                action={() => setShowDeletePopup(true)}
              />
            )}

            {/* Modal de confirmación para eliminar */}
            <Modal
              transparent={true}
              visible={showDeletePopup}
              onRequestClose={() => setShowDeletePopup(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowDeletePopup(false)}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>¿Eliminar empleado?</Text>
                  <Text style={styles.modalText}>
                    ¿Está seguro de eliminar a {state.nombre}?
                  </Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setShowDeletePopup(false)}
                    >
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.deleteButton]}
                      onPress={async () => {
                        setShowDeletePopup(false);
                        await handleDeleteConfirmed();
                      }}
                    >
                      <Text style={[styles.buttonText, { color: '#fff' }]}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Botón debug eliminado - la confirmación ahora llama a la misma lógica que el debug */}

            <BtnTouch titulo='Regresar' color='gray' action={() => navigation.navigate('EmpleadosList')} />
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
  input: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  imageSectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  imageWrapper: { alignItems: 'center', marginTop: 12, backgroundColor: '#f9f9f9', padding: 8, borderRadius: 8 },
  image: { width: 200, height: 200, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  buttonContainer: { marginTop: 20, gap: 12 },
  // Estilos para el modal de confirmación
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#f0f0f0'
  },
  deleteButton: {
    backgroundColor: '#ff3b30'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600'
  }
});

export default FormEmpleado;
