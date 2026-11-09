
import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';

import InicioScreen from './android/app/src/screens/InicioScreen';
import EstudiantesScreen from './android/app/src/screens/EstudiantesScreen';
import ReportesScreen from './android/app/src/screens/ReportesScreen';
import AjustesScreen from './android/app/src/screens/AjustesScreen';

type Pantalla = 'Inicio' | 'Estudiantes' | 'Reportes' | 'Ajustes';

export default function App() {
  const [pantalla, setPantalla] = useState<Pantalla>('Inicio');

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      {pantalla === 'Inicio' && (
        <InicioScreen onNavigate={setPantalla} />
      )}

      {pantalla === 'Estudiantes' && (
        <EstudiantesScreen onNavigate={setPantalla} />
      )}

      {pantalla === 'Reportes' && (
        <ReportesScreen onNavigate={setPantalla} />
      )}

      {pantalla === 'Ajustes' && (
        <AjustesScreen onNavigate={setPantalla} />
      )}
    </View>
  );
}
