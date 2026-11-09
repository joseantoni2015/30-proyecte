
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const estudiantesIniciales = [
  {
    id: '1',
    nombre: 'Carlos Rodríguez',
    matricula: '2024-001',
    carrera: 'Ingeniería de Software',
    nivel: 'Pregrado',
    estado: 'Activo',
  },
  {
    id: '2',
    nombre: 'María Fernández',
    matricula: '2024-002',
    carrera: 'Administración de Empresas',
    nivel: 'Pregrado',
    estado: 'Activo',
  },
  {
    id: '3',
    nombre: 'José Martínez',
    matricula: '2024-003',
    carrera: 'Maestría en Tecnología',
    nivel: 'Posgrado',
    estado: 'Activo',
  },
  {
    id: '4',
    nombre: 'Ana Pérez',
    matricula: '2024-004',
    carrera: 'Contabilidad',
    nivel: 'Pregrado',
    estado: 'Inactivo',
  },
  {
    id: '5',
    nombre: 'Luis González',
    matricula: '2024-005',
    carrera: 'Ingeniería de Software',
    nivel: 'Pregrado',
    estado: 'Activo',
  },
];

export default function EstudiantesScreen({ onNavigate }) {
  const [estudiantes, setEstudiantes] = useState(estudiantesIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState(null);

  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [nivel, setNivel] = useState('Pregrado');

  const navegar = (pantalla) => {
    if (typeof onNavigate === 'function') {
      onNavigate(pantalla);
    }
  };

  const estudiantesFiltrados = estudiantes.filter((estudiante) => {
    const texto = busqueda.toLowerCase();

    return (
      estudiante.nombre.toLowerCase().includes(texto) ||
      estudiante.matricula.toLowerCase().includes(texto) ||
      estudiante.carrera.toLowerCase().includes(texto)
    );
  });

  const abrirNuevo = () => {
    setEditando(null);
    setNombre('');
    setMatricula('');
    setCarrera('');
    setNivel('Pregrado');
    setModalVisible(true);
  };

  const abrirEditar = (estudiante) => {
    setEditando(estudiante);
    setNombre(estudiante.nombre);
    setMatricula(estudiante.matricula);
    setCarrera(estudiante.carrera);
    setNivel(estudiante.nivel);
    setModalVisible(true);
  };

  const guardarEstudiante = () => {
    if (!nombre.trim() || !matricula.trim() || !carrera.trim()) {
      Alert.alert('Campos requeridos', 'Completa todos los campos.');
      return;
    }

    if (
      estudiantes.some(
        (e) =>
          e.matricula.toLowerCase() === matricula.trim().toLowerCase() &&
          e.id !== editando?.id
      )
    ) {
      Alert.alert('Matrícula existente', 'Ya existe un estudiante con esa matrícula.');
      return;
    }

    if (editando) {
      setEstudiantes((actuales) =>
        actuales.map((e) =>
          e.id === editando.id
            ? {
                ...e,
                nombre: nombre.trim(),
                matricula: matricula.trim(),
                carrera: carrera.trim(),
                nivel,
              }
            : e
        )
      );
      Alert.alert('Actualizado', 'Estudiante actualizado correctamente.');
    } else {
      const nuevoEstudiante = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        matricula: matricula.trim(),
        carrera: carrera.trim(),
        nivel,
        estado: 'Activo',
      };

      setEstudiantes((actuales) => [nuevoEstudiante, ...actuales]);
      Alert.alert('Registrado', 'Estudiante agregado correctamente.');
    }

    setModalVisible(false);
  };

  const eliminarEstudiante = (id) => {
    Alert.alert(
      'Eliminar estudiante',
      '¿Estás seguro de que deseas eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setEstudiantes((actuales) =>
              actuales.filter((e) => e.id !== id)
            );
          },
        },
      ]
    );
  };

  const totalActivos = estudiantes.filter(
    (e) => e.estado === 'Activo'
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ENCABEZADO */}
          <View style={styles.header}>
            <View>
              <Text style={styles.saludo}>Gestión académica</Text>
              <Text style={styles.titulo}>Estudiantes</Text>
              <Text style={styles.subtitulo}>
                Administra los registros de estudiantes
              </Text>
            </View>

            <TouchableOpacity style={styles.headerIcono}>
              <Icon name="school" size={26} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          {/* RESUMEN */}
          <View style={styles.resumen}>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenNumero}>{estudiantes.length}</Text>
              <Text style={styles.resumenTexto}>Total estudiantes</Text>
            </View>

            <View style={styles.separador} />

            <View style={styles.resumenItem}>
              <Text style={[styles.resumenNumero, { color: '#059669' }]}>
                {totalActivos}
              </Text>
              <Text style={styles.resumenTexto}>Activos</Text>
            </View>

            <View style={styles.separador} />

            <View style={styles.resumenItem}>
              <Text style={[styles.resumenNumero, { color: '#D97706' }]}>
                {estudiantes.length - totalActivos}
              </Text>
              <Text style={styles.resumenTexto}>Inactivos</Text>
            </View>
          </View>

          {/* BUSCADOR */}
          <View style={styles.busqueda}>
            <Icon name="search" size={22} color="#94A3B8" />

            <TextInput
              style={styles.inputBusqueda}
              placeholder="Buscar por nombre, matrícula o carrera..."
              placeholderTextColor="#94A3B8"
              value={busqueda}
              onChangeText={setBusqueda}
            />

            {busqueda.length > 0 && (
              <TouchableOpacity onPress={() => setBusqueda('')}>
                <Icon name="close" size={21} color="#64748B" />
              </TouchableOpacity>
            )}
          </View>

          {/* BOTÓN NUEVO */}
          <TouchableOpacity style={styles.botonNuevo} onPress={abrirNuevo}>
            <Icon name="person-add" size={21} color="#FFFFFF" />
            <Text style={styles.botonNuevoTexto}>Registrar estudiante</Text>
            <Icon name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* LISTADO */}
          <View style={styles.listaEncabezado}>
            <Text style={styles.listaTitulo}>Lista de estudiantes</Text>
            <Text style={styles.listaCantidad}>
              {estudiantesFiltrados.length} registros
            </Text>
          </View>

          {estudiantesFiltrados.length === 0 ? (
            <View style={styles.vacio}>
              <Icon name="person-search" size={45} color="#CBD5E1" />
              <Text style={styles.vacioTitulo}>No se encontraron estudiantes</Text>
              <Text style={styles.vacioTexto}>
                Intenta con otro nombre o matrícula.
              </Text>
            </View>
          ) : (
            estudiantesFiltrados.map((estudiante) => (
              <View style={styles.tarjeta} key={estudiante.id}>
                <View style={styles.tarjetaSuperior}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarTexto}>
                      {estudiante.nombre
                        .split(' ')
                        .slice(0, 2)
                        .map((parte) => parte[0])
                        .join('')
                        .toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.datos}>
                    <Text style={styles.nombre}>{estudiante.nombre}</Text>
                    <Text style={styles.matricula}>
                      Matrícula: {estudiante.matricula}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.estado,
                      estudiante.estado === 'Activo'
                        ? styles.estadoActivo
                        : styles.estadoInactivo,
                    ]}
                  >
                    <Text
                      style={[
                        styles.estadoTexto,
                        estudiante.estado === 'Activo'
                          ? styles.textoActivo
                          : styles.textoInactivo,
                      ]}
                    >
                      {estudiante.estado}
                    </Text>
                  </View>
                </View>

                <View style={styles.linea} />

                <View style={styles.detalles}>
                  <View style={styles.detalleItem}>
                    <Icon name="school" size={17} color="#64748B" />
                    <Text style={styles.detalleTexto}>
                      {estudiante.carrera}
                    </Text>
                  </View>

                  <View style={styles.detalleItem}>
                    <Icon name="book" size={17} color="#64748B" />
                    <Text style={styles.detalleTexto}>{estudiante.nivel}</Text>
                  </View>
                </View>

                <View style={styles.acciones}>
                  <TouchableOpacity
                    style={styles.botonEditar}
                    onPress={() => abrirEditar(estudiante)}
                  >
                    <Icon name="edit" size={17} color="#4F46E5" />
                    <Text style={styles.textoEditar}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botonEliminar}
                    onPress={() => eliminarEstudiante(estudiante.id)}
                  >
                    <Icon name="delete-outline" size={18} color="#DC2626" />
                    <Text style={styles.textoEliminar}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* NAVEGACIÓN INFERIOR */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navegar('Inicio')}
          >
            <Icon name="home" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navegar('Estudiantes')}
          >
            <Icon name="people" size={24} color="#4F46E5" />
            <Text style={[styles.navTexto, styles.navActivo]}>
              Estudiantes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navegar('Reportes')}
          >
            <Icon name="bar-chart" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Reportes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navegar('Ajustes')}
          >
            <Icon name="settings" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Ajustes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL DE REGISTRO Y EDICIÓN */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <View style={styles.modalEncabezado}>
              <View>
                <Text style={styles.modalTitulo}>
                  {editando ? 'Editar estudiante' : 'Nuevo estudiante'}
                </Text>
                <Text style={styles.modalSubtitulo}>
                  Completa los datos del estudiante
                </Text>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={25} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Matrícula</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 2024-006"
              value={matricula}
              onChangeText={setMatricula}
            />

            <Text style={styles.label}>Carrera</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Ingeniería de Software"
              value={carrera}
              onChangeText={setCarrera}
            />

            <Text style={styles.label}>Nivel académico</Text>

            <View style={styles.niveles}>
              {['Pregrado', 'Posgrado'].map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  style={[
                    styles.nivelBoton,
                    nivel === opcion && styles.nivelSeleccionado,
                  ]}
                  onPress={() => setNivel(opcion)}
                >
                  <Text
                    style={[
                      styles.nivelTexto,
                      nivel === opcion && styles.nivelTextoSeleccionado,
                    ]}
                  >
                    {opcion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.guardarBoton}
              onPress={guardarEstudiante}
            >
              <Icon name="save" size={20} color="#FFFFFF" />
              <Text style={styles.guardarTexto}>
                {editando ? 'Guardar cambios' : 'Registrar estudiante'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelarBoton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },
  saludo: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitulo: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },
  headerIcono: {
    width: 48,
    height: 48,
    backgroundColor: '#EEF2FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumen: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  resumenItem: {
    flex: 1,
    alignItems: 'center',
  },
  resumenNumero: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4F46E5',
  },
  resumenTexto: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 5,
    textAlign: 'center',
  },
  separador: {
    height: 35,
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  busqueda: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 1,
  },
  inputBusqueda: {
    flex: 1,
    marginLeft: 10,
    color: '#1E293B',
    fontSize: 12,
  },
  botonNuevo: {
    backgroundColor: '#4F46E5',
    height: 50,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginBottom: 25,
  },
  botonNuevoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  listaEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  listaTitulo: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
  },
  listaCantidad: {
    color: '#64748B',
    fontSize: 11,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    marginBottom: 13,
    elevation: 2,
  },
  tarjetaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTexto: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '800',
  },
  datos: {
    flex: 1,
    marginLeft: 11,
  },
  nombre: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '800',
  },
  matricula: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 5,
  },
  estado: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },
  estadoActivo: {
    backgroundColor: '#DCFCE7',
  },
  estadoInactivo: {
    backgroundColor: '#FEE2E2',
  },
  estadoTexto: {
    fontSize: 9,
    fontWeight: '700',
  },
  textoActivo: {
    color: '#15803D',
  },
  textoInactivo: {
    color: '#DC2626',
  },
  linea: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 13,
  },
  detalles: {
    gap: 10,
  },
  detalleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detalleTexto: {
    color: '#64748B',
    fontSize: 11,
    flex: 1,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },
  botonEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    gap: 5,
  },
  textoEditar: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
  botonEliminar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    gap: 5,
  },
  textoEliminar: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '700',
  },
  vacio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 30,
    alignItems: 'center',
  },
  vacioTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginTop: 12,
  },
  vacioTexto: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 6,
  },
  bottomNav: {
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navTexto: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  navActivo: {
    color: '#4F46E5',
    fontWeight: '800',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContenido: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
  },
  modalEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  modalTitulo: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
  },
  modalSubtitulo: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 5,
  },
  label: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 10,
  },
  input: {
    height: 47,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 11,
    paddingHorizontal: 12,
    color: '#0F172A',
    fontSize: 13,
  },
  niveles: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  nivelBoton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  nivelSeleccionado: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  nivelTexto: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  nivelTextoSeleccionado: {
    color: '#4F46E5',
  },
  guardarBoton: {
    height: 48,
    backgroundColor: '#4F46E5',
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  guardarTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  cancelarBoton: {
    alignItems: 'center',
    padding: 13,
  },
  cancelarTexto: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
});
