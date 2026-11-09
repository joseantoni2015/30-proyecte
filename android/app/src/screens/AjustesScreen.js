
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AjustesScreen({ onNavigate }) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatorios, setRecordatorios] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  const opcion = (titulo, descripcion, icono, accion, color = '#4F46E5', fondo = '#EEF2FF') => (
    <TouchableOpacity
      style={styles.opcion}
      onPress={accion}
      activeOpacity={0.7}
    >
      <View style={[styles.icono, { backgroundColor: fondo }]}>
        <Icon name={icono} size={23} color={color} />
      </View>

      <View style={styles.opcionContenido}>
        <Text style={styles.opcionTitulo}>{titulo}</Text>
        <Text style={styles.opcionDescripcion}>{descripcion}</Text>
      </View>

      <Icon name="chevron-right" size={23} color="#94A3B8" />
    </TouchableOpacity>
  );

  const cerrarSesion = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Deseas cerrar tu sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => Alert.alert('Sistema', 'Sesión finalizada'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#F8FAFC"
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* ENCABEZADO */}
          <View style={styles.header}>
            <View>
              <Text style={styles.subtitulo}>CONFIGURACIÓN</Text>
              <Text style={styles.titulo}>Ajustes</Text>
              <Text style={styles.descripcion}>
                Personaliza tu sistema académico
              </Text>
            </View>

            <View style={styles.headerIcon}>
              <Icon name="settings" size={25} color="#4F46E5" />
            </View>
          </View>

          {/* PERFIL */}
          <TouchableOpacity
            style={styles.perfil}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Perfil', 'Configuración del perfil')}
          >
            <View style={styles.avatar}>
              <Icon name="person" size={29} color="#FFFFFF" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nombre}>Administrador</Text>
              <Text style={styles.correo}>admin@academia.com</Text>
              <Text style={styles.rol}>
                Administrador del sistema
              </Text>
            </View>

            <Icon name="chevron-right" size={24} color="#94A3B8" />
          </TouchableOpacity>

          {/* GENERAL */}
          <Text style={styles.seccion}>GENERAL</Text>

          <View style={styles.card}>
            {opcion(
              'Perfil de usuario',
              'Administra tus datos personales',
              'person-outline',
              () => Alert.alert('Perfil', 'Configuración del perfil')
            )}

            <View style={styles.linea} />

            {opcion(
              'Información de la academia',
              'Nombre, dirección y contacto',
              'school',
              () => Alert.alert('Academia', 'Información de la academia'),
              '#0891B2',
              '#ECFEFF'
            )}

            <View style={styles.linea} />

            {opcion(
              'Idioma',
              'Español',
              'language',
              () => Alert.alert('Idioma', 'Idioma seleccionado: Español'),
              '#D97706',
              '#FFFBEB'
            )}
          </View>

          {/* PREFERENCIAS */}
          <Text style={styles.seccion}>PREFERENCIAS</Text>

          <View style={styles.card}>

            <View style={styles.opcion}>
              <View style={[styles.icono, { backgroundColor: '#EEF2FF' }]}>
                <Icon
                  name="notifications-none"
                  size={23}
                  color="#4F46E5"
                />
              </View>

              <View style={styles.opcionContenido}>
                <Text style={styles.opcionTitulo}>
                  Notificaciones
                </Text>
                <Text style={styles.opcionDescripcion}>
                  Recibir avisos del sistema
                </Text>
              </View>

              <Switch
                value={notificaciones}
                onValueChange={setNotificaciones}
                trackColor={{
                  false: '#D1D5DB',
                  true: '#A5B4FC',
                }}
                thumbColor={notificaciones ? '#4F46E5' : '#F4F4F5'}
              />
            </View>

            <View style={styles.linea} />

            <View style={styles.opcion}>
              <View style={[styles.icono, { backgroundColor: '#ECFEFF' }]}>
                <Icon name="event" size={23} color="#0891B2" />
              </View>

              <View style={styles.opcionContenido}>
                <Text style={styles.opcionTitulo}>
                  Recordatorios
                </Text>
                <Text style={styles.opcionDescripcion}>
                  Fechas y actividades académicas
                </Text>
              </View>

              <Switch
                value={recordatorios}
                onValueChange={setRecordatorios}
                trackColor={{
                  false: '#D1D5DB',
                  true: '#A5B4FC',
                }}
                thumbColor={recordatorios ? '#4F46E5' : '#F4F4F5'}
              />
            </View>

            <View style={styles.linea} />

            <View style={styles.opcion}>
              <View style={[styles.icono, { backgroundColor: '#F3E8FF' }]}>
                <Icon name="dark-mode" size={23} color="#9333EA" />
              </View>

              <View style={styles.opcionContenido}>
                <Text style={styles.opcionTitulo}>
                  Modo oscuro
                </Text>
                <Text style={styles.opcionDescripcion}>
                  Cambiar apariencia visual
                </Text>
              </View>

              <Switch
                value={modoOscuro}
                onValueChange={setModoOscuro}
                trackColor={{
                  false: '#D1D5DB',
                  true: '#A5B4FC',
                }}
                thumbColor={modoOscuro ? '#4F46E5' : '#F4F4F5'}
              />
            </View>

          </View>

          {/* SEGURIDAD */}
          <Text style={styles.seccion}>
            SEGURIDAD Y SISTEMA
          </Text>

          <View style={styles.card}>
            {opcion(
              'Seguridad',
              'Cambiar contraseña y proteger cuenta',
              'security',
              () => Alert.alert('Seguridad', 'Opciones de seguridad'),
              '#D97706',
              '#FFFBEB'
            )}

            <View style={styles.linea} />

            {opcion(
              'Copias de seguridad',
              'Gestionar respaldos de información',
              'backup',
              () => Alert.alert('Respaldos', 'Administrar copias de seguridad'),
              '#059669',
              '#ECFDF5'
            )}

            <View style={styles.linea} />

            {opcion(
              'Acerca del sistema',
              'Versión 1.0.0',
              'info-outline',
              () => Alert.alert('Sistema Académico', 'Versión 1.0.0')
            )}
          </View>

          {/* CERRAR SESIÓN */}
          <TouchableOpacity
            style={styles.cerrar}
            onPress={cerrarSesion}
            activeOpacity={0.8}
          >
            <Icon name="logout" size={20} color="#DC4545" />
            <Text style={styles.cerrarTexto}>Cerrar sesión</Text>
          </TouchableOpacity>

          <Text style={styles.version}>
            SISTEMA ACADÉMICO · VERSIÓN 1.0.0
          </Text>

          <View style={{ height: 25 }} />

        </ScrollView>

        {/* NAVEGACIÓN INFERIOR */}
        <View style={styles.bottomNav}>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => onNavigate('Inicio')}
          >
            <Icon name="home" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => onNavigate('Estudiantes')}
          >
            <Icon name="people-outline" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Estudiantes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => onNavigate('Reportes')}
          >
            <Icon name="bar-chart" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Reportes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => onNavigate('Ajustes')}
          >
            <Icon name="settings" size={24} color="#4F46E5" />
            <Text style={[styles.navTexto, styles.navActivo]}>
              Ajustes
            </Text>
          </TouchableOpacity>

        </View>
      </View>
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
    marginBottom: 25,
  },

  subtitulo: {
    color: '#6366F1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  titulo: {
    fontSize: 29,
    fontWeight: '800',
    color: '#172033',
    marginTop: 5,
  },

  descripcion: {
    color: '#8992A5',
    fontSize: 13,
    marginTop: 5,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#E8EAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  perfil: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0,
    padding: 17,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 2,
  },

  avatar: {
    width: 53,
    height: 53,
    borderRadius: 17,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  nombre: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172033',
  },

  correo: {
    color: '#8992A5',
    fontSize: 12,
    marginTop: 3,
  },

  rol: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },

  seccion: {
    marginHorizontal: 2,
    marginBottom: 10,
    color: '#8992A5',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0,
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 23,
    elevation: 1,
  },

  opcion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  icono: {
    width: 42,
    height: 42,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  opcionContenido: {
    flex: 1,
  },

  opcionTitulo: {
    color: '#202A3C',
    fontSize: 13,
    fontWeight: '700',
  },

  opcionDescripcion: {
    color: '#9AA2B1',
    fontSize: 11,
    marginTop: 4,
  },

  linea: {
    height: 1,
    backgroundColor: '#F0F1F5',
    marginLeft: 54,
  },

  cerrar: {
    marginHorizontal: 0,
    backgroundColor: '#FFF0F0',
    borderRadius: 15,
    padding: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 9,
  },

  cerrarTexto: {
    color: '#DC4545',
    fontSize: 14,
    fontWeight: '800',
  },

  version: {
    textAlign: 'center',
    color: '#A4AAB7',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 20,
  },

  bottomNav: {
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EDF0F5',
    paddingBottom: 5,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
});
