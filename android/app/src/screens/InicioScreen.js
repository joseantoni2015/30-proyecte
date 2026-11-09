
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function InicioScreen({ onNavigate }) {
  const estadisticas = [
    {
      titulo: 'Estudiantes',
      cantidad: '125',
      detalle: 'Total matriculados',
      icono: 'school',
      color: '#4F46E5',
      fondo: '#EEF2FF',
    },
    {
      titulo: 'Pregrado',
      cantidad: '98',
      detalle: 'Estudiantes activos',
      icono: 'menu-book',
      color: '#0891B2',
      fondo: '#ECFEFF',
    },
    {
      titulo: 'Posgrado',
      cantidad: '27',
      detalle: 'Estudiantes activos',
      icono: 'workspace-premium',
      color: '#D97706',
      fondo: '#FFFBEB',
    },
    {
      titulo: 'Reportes',
      cantidad: '12',
      detalle: 'Reportes disponibles',
      icono: 'bar-chart',
      color: '#059669',
      fondo: '#ECFDF5',
    },
  ];

  const actividades = [
    {
      nombre: 'Carlos Rodríguez',
      accion: 'Nuevo estudiante registrado',
      hora: 'Hace 10 minutos',
      icono: 'person-add',
    },
    {
      nombre: 'María Fernández',
      accion: 'Actualización de información',
      hora: 'Hace 35 minutos',
      icono: 'edit',
    },
    {
      nombre: 'José Martínez',
      accion: 'Inscripción completada',
      hora: 'Hace 1 hora',
      icono: 'assignment-turned-in',
    },
  ];

  const navegar = (pantalla) => {
    if (typeof onNavigate === 'function') {
      onNavigate(pantalla);
    }
  };

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
              <Text style={styles.saludo}>Bienvenido de nuevo</Text>
              <Text style={styles.titulo}>Panel académico</Text>
              <Text style={styles.subtitulo}>
                Resumen general de la academia
              </Text>
            </View>

            <TouchableOpacity style={styles.notificacion}>
              <Icon name="notifications-none" size={25} color="#1E293B" />
              <View style={styles.puntoNotificacion} />
            </TouchableOpacity>
          </View>

          {/* TARJETA PRINCIPAL */}
          <View style={styles.banner}>
            <View style={styles.bannerContenido}>
              <Text style={styles.bannerEtiqueta}>SISTEMA ACADÉMICO</Text>
              <Text style={styles.bannerTitulo}>
                Gestiona tu academia
              </Text>
              <Text style={styles.bannerDescripcion}>
                Administra estudiantes y consulta la información académica
                desde un solo lugar.
              </Text>

              <TouchableOpacity
                style={styles.bannerBoton}
                onPress={() => navegar('Estudiantes')}
              >
                <Text style={styles.bannerBotonTexto}>
                  Ver estudiantes
                </Text>
                <Icon name="arrow-forward" size={18} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            <View style={styles.bannerIcono}>
              <Icon name="school" size={55} color="#FFFFFF" />
            </View>
          </View>

          {/* ESTADÍSTICAS */}
          <View style={styles.seccionEncabezado}>
            <Text style={styles.seccionTitulo}>Resumen general</Text>
            <Text style={styles.seccionDetalle}>Noviembre 2026</Text>
          </View>

          <View style={styles.grid}>
            {estadisticas.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.estadistica}
                activeOpacity={0.8}
                onPress={() =>
                  navegar(item.titulo === 'Reportes' ? 'Reportes' : 'Estudiantes')
                }
              >
                <View
                  style={[
                    styles.estadisticaIcono,
                    { backgroundColor: item.fondo },
                  ]}
                >
                  <Icon name={item.icono} size={23} color={item.color} />
                </View>

                <Text style={styles.estadisticaCantidad}>
                  {item.cantidad}
                </Text>

                <Text style={styles.estadisticaTitulo}>
                  {item.titulo}
                </Text>

                <Text style={styles.estadisticaDetalle}>
                  {item.detalle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ACCESOS RÁPIDOS */}
          <View style={styles.seccionEncabezado}>
            <Text style={styles.seccionTitulo}>Accesos rápidos</Text>
          </View>

          <View style={styles.accesos}>
            <TouchableOpacity
              style={styles.acceso}
              onPress={() => navegar('Estudiantes')}
            >
              <View style={[styles.accesoIcono, { backgroundColor: '#EEF2FF' }]}>
                <Icon name="people" size={24} color="#4F46E5" />
              </View>
              <View style={styles.accesoTexto}>
                <Text style={styles.accesoTitulo}>Estudiantes</Text>
                <Text style={styles.accesoDescripcion}>
                  Administrar registros
                </Text>
              </View>
              <Icon name="chevron-right" size={23} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acceso}
              onPress={() => navegar('Reportes')}
            >
              <View style={[styles.accesoIcono, { backgroundColor: '#ECFDF5' }]}>
                <Icon name="assessment" size={24} color="#059669" />
              </View>
              <View style={styles.accesoTexto}>
                <Text style={styles.accesoTitulo}>Reportes</Text>
                <Text style={styles.accesoDescripcion}>
                  Consultar estadísticas
                </Text>
              </View>
              <Icon name="chevron-right" size={23} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* ACTIVIDAD RECIENTE */}
          <View style={styles.seccionEncabezado}>
            <Text style={styles.seccionTitulo}>Actividad reciente</Text>
            <Text style={styles.verTodo}>Últimos registros</Text>
          </View>

          <View style={styles.actividades}>
            {actividades.map((actividad, index) => (
              <View style={styles.actividad} key={index}>
                <View style={styles.actividadIcono}>
                  <Icon name={actividad.icono} size={21} color="#4F46E5" />
                </View>

                <View style={styles.actividadContenido}>
                  <Text style={styles.actividadNombre}>
                    {actividad.nombre}
                  </Text>
                  <Text style={styles.actividadAccion}>
                    {actividad.accion}
                  </Text>
                  <Text style={styles.actividadHora}>
                    {actividad.hora}
                  </Text>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>

        {/* NAVEGACIÓN INFERIOR */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navegar('Inicio')}
          >
            <Icon name="home" size={24} color="#4F46E5" />
            <Text style={[styles.navTexto, styles.navActivo]}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navegar('Estudiantes')}
          >
            <Icon name="people-outline" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Estudiantes</Text>
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
  saludo: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 25,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
  },
  notificacion: {
    width: 45,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  puntoNotificacion: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  banner: {
    backgroundColor: '#4338CA',
    borderRadius: 22,
    padding: 22,
    marginBottom: 27,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerContenido: {
    flex: 1,
  },
  bannerEtiqueta: {
    color: '#C7D2FE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  bannerTitulo: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 9,
  },
  bannerDescripcion: {
    color: '#E0E7FF',
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 17,
  },
  bannerBoton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  bannerBotonTexto: {
    color: '#4338CA',
    fontSize: 12,
    fontWeight: '700',
  },
  bannerIcono: {
    marginLeft: 5,
    opacity: 0.9,
  },
  seccionEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  seccionTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  seccionDetalle: {
    fontSize: 11,
    color: '#64748B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  estadistica: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    marginBottom: 13,
    elevation: 2,
  },
  estadisticaIcono: {
    width: 42,
    height: 42,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  estadisticaCantidad: {
    fontSize: 25,
    fontWeight: '800',
    color: '#0F172A',
  },
  estadisticaTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginTop: 3,
  },
  estadisticaDetalle: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 5,
  },
  accesos: {
    marginBottom: 25,
  },
  acceso: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 13,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  accesoIcono: {
    width: 45,
    height: 45,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accesoTexto: {
    flex: 1,
    marginLeft: 13,
  },
  accesoTitulo: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  accesoDescripcion: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },
  verTodo: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '600',
  },
  actividades: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,
  },
  actividad: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  actividadIcono: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actividadContenido: {
    flex: 1,
  },
  actividadNombre: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  actividadAccion: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  actividadHora: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
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
});
