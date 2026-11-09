
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

export default function ReportesScreen({ onNavigate }) {
  const navegar = (pantalla) => {
    if (typeof onNavigate === 'function') {
      onNavigate(pantalla);
    }
  };

  const total = 125;
  const pregrado = 98;
  const posgrado = 27;
  const porcentajePregrado = (pregrado / total) * 100;
  const porcentajePosgrado = (posgrado / total) * 100;

  const reportes = [
    {
      titulo: 'Estudiantes matriculados',
      cantidad: '125',
      descripcion: 'Total de estudiantes registrados',
      icono: 'people',
      color: '#4F46E5',
      fondo: '#EEF2FF',
    },
    {
      titulo: 'Estudiantes de pregrado',
      cantidad: '98',
      descripcion: '78.4% de la matrícula total',
      icono: 'school',
      color: '#0891B2',
      fondo: '#ECFEFF',
    },
    {
      titulo: 'Estudiantes de posgrado',
      cantidad: '27',
      descripcion: '21.6% de la matrícula total',
      icono: 'workspace-premium',
      color: '#D97706',
      fondo: '#FFFBEB',
    },
  ];

  const actividades = [
    {
      nombre: 'Carlos Rodríguez',
      accion: 'Registro de estudiante',
      fecha: '09 Noviembre 2026',
      icono: 'person-add',
    },
    {
      nombre: 'María Fernández',
      accion: 'Actualización de información',
      fecha: '08 Noviembre 2026',
      icono: 'edit',
    },
    {
      nombre: 'José Martínez',
      accion: 'Inscripción académica',
      fecha: '07 Noviembre 2026',
      icono: 'assignment-turned-in',
    },
  ];

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
              <Text style={styles.saludo}>Análisis académico</Text>
              <Text style={styles.titulo}>Reportes</Text>
              <Text style={styles.subtitulo}>
                Estadísticas generales de la academia
              </Text>
            </View>

            <View style={styles.headerIcono}>
              <Icon name="analytics" size={27} color="#4F46E5" />
            </View>
          </View>

          {/* RESUMEN PRINCIPAL */}
          <View style={styles.resumenPrincipal}>
            <View style={styles.resumenSuperior}>
              <View>
                <Text style={styles.resumenEtiqueta}>
                  TOTAL DE MATRICULADOS
                </Text>
                <Text style={styles.resumenCantidad}>125</Text>
                <Text style={styles.resumenDescripcion}>
                  Estudiantes registrados
                </Text>
              </View>

              <View style={styles.resumenIcono}>
                <Icon name="groups" size={38} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.resumenLinea} />

            <View style={styles.resumenInferior}>
              <View>
                <Text style={styles.resumenPequeno}>Pregrado</Text>
                <Text style={styles.resumenValor}>98 estudiantes</Text>
              </View>

              <View>
                <Text style={styles.resumenPequeno}>Posgrado</Text>
                <Text style={styles.resumenValor}>27 estudiantes</Text>
              </View>
            </View>
          </View>

          {/* INDICADORES */}
          <View style={styles.seccionEncabezado}>
            <Text style={styles.seccionTitulo}>Indicadores académicos</Text>
            <Text style={styles.seccionFecha}>Noviembre 2026</Text>
          </View>

          {reportes.map((item, index) => (
            <View style={styles.indicador} key={index}>
              <View
                style={[
                  styles.indicadorIcono,
                  { backgroundColor: item.fondo },
                ]}
              >
                <Icon name={item.icono} size={24} color={item.color} />
              </View>

              <View style={styles.indicadorContenido}>
                <Text style={styles.indicadorTitulo}>{item.titulo}</Text>
                <Text style={styles.indicadorDescripcion}>
                  {item.descripcion}
                </Text>
              </View>

              <Text style={styles.indicadorCantidad}>{item.cantidad}</Text>
            </View>
          ))}

          {/* DISTRIBUCIÓN */}
          <View style={styles.seccionEncabezado}>
            <Text style={styles.seccionTitulo}>
              Distribución de estudiantes
            </Text>
          </View>

          <View style={styles.distribucion}>
            <Text style={styles.distribucionTitulo}>
              Matrícula por nivel académico
            </Text>

            <View style={styles.barraContenedor}>
              <View
                style={[
                  styles.barraPregrado,
                  { width: `${porcentajePregrado}%` },
                ]}
              />
              <View
                style={[
                  styles.barraPosgrado,
                  { width: `${porcentajePosgrado}%` },
                ]}
              />
            </View>

            <View style={styles.leyenda}>
              <View style={styles.leyendaItem}>
                <View style={styles.puntoPregrado} />
                <View style={styles.leyendaTexto}>
                  <Text style={styles.leyendaTitulo}>Pregrado</Text>
                  <Text style={styles.leyendaCantidad}>
                    98 estudiantes (78.4%)
                  </Text>
                </View>
              </View>

              <View style={styles.leyendaItem}>
                <View style={styles.puntoPosgrado} />
                <View style={styles.leyendaTexto}>
                  <Text style={styles.leyendaTitulo}>Posgrado</Text>
                  <Text style={styles.leyendaCantidad}>
                    27 estudiantes (21.6%)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ACTIVIDAD RECIENTE */}
          <View style={styles.seccionEncabezado}>
            <Text style={styles.seccionTitulo}>Actividad reciente</Text>
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
                  <Text style={styles.actividadFecha}>
                    {actividad.fecha}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* INFORMACIÓN */}
          <View style={styles.nota}>
            <Icon name="info-outline" size={20} color="#4F46E5" />
            <Text style={styles.notaTexto}>
              Estos reportes utilizan datos de demostración. La conexión con
              la base de datos permitirá mostrar estadísticas actualizadas.
            </Text>
          </View>
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
            <Icon name="people-outline" size={24} color="#94A3B8" />
            <Text style={styles.navTexto}>Estudiantes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navegar('Reportes')}
          >
            <Icon name="bar-chart" size={24} color="#4F46E5" />
            <Text style={[styles.navTexto, styles.navActivo]}>
              Reportes
            </Text>
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
    marginBottom: 24,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumenPrincipal: {
    backgroundColor: '#4338CA',
    borderRadius: 21,
    padding: 21,
    marginBottom: 27,
  },
  resumenSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumenEtiqueta: {
    fontSize: 10,
    color: '#C7D2FE',
    fontWeight: '800',
    letterSpacing: 1,
  },
  resumenCantidad: {
    fontSize: 38,
    color: '#FFFFFF',
    fontWeight: '800',
    marginTop: 7,
  },
  resumenDescripcion: {
    color: '#E0E7FF',
    fontSize: 12,
    marginTop: 3,
  },
  resumenIcono: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumenLinea: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 19,
  },
  resumenInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resumenPequeno: {
    color: '#C7D2FE',
    fontSize: 11,
  },
  resumenValor: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },
  seccionEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  seccionTitulo: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  seccionFecha: {
    color: '#64748B',
    fontSize: 10,
  },
  indicador: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    elevation: 1,
  },
  indicadorIcono: {
    width: 45,
    height: 45,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicadorContenido: {
    flex: 1,
    marginLeft: 12,
  },
  indicadorTitulo: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '700',
  },
  indicadorDescripcion: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 5,
  },
  indicadorCantidad: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
  },
  distribucion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 17,
    marginBottom: 25,
    elevation: 1,
  },
  distribucionTitulo: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 18,
  },
  barraContenedor: {
    height: 13,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  barraPregrado: {
    height: 13,
    backgroundColor: '#4F46E5',
  },
  barraPosgrado: {
    height: 13,
    backgroundColor: '#F59E0B',
  },
  leyenda: {
    marginTop: 20,
    gap: 17,
  },
  leyendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  puntoPregrado: {
    width: 11,
    height: 11,
    backgroundColor: '#4F46E5',
    borderRadius: 6,
    marginRight: 11,
  },
  puntoPosgrado: {
    width: 11,
    height: 11,
    backgroundColor: '#F59E0B',
    borderRadius: 6,
    marginRight: 11,
  },
  leyendaTexto: {
    flex: 1,
  },
  leyendaTitulo: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
  },
  leyendaCantidad: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 3,
  },
  actividades: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 18,
    elevation: 1,
  },
  actividad: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  actividadIcono: {
    width: 42,
    height: 42,
    backgroundColor: '#EEF2FF',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actividadContenido: {
    flex: 1,
  },
  actividadNombre: {
    color: '#1E293B',
    fontSize: 12,
    fontWeight: '700',
  },
  actividadAccion: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 4,
  },
  actividadFecha: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 4,
  },
  nota: {
    backgroundColor: '#EEF2FF',
    padding: 14,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 15,
  },
  notaTexto: {
    color: '#4338CA',
    fontSize: 11,
    lineHeight: 17,
    flex: 1,
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
