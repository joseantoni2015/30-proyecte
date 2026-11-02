
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function NominaCalculator() {
  const [hours, setHours] = useState('45');
  const [rate, setRate] = useState('10.50');
  const [activePreset, setActivePreset] = useState('45');

  const { width } = useWindowDimensions();
  const compact = width < 360;

  // Cálculos de nómina
  const hNum = Math.max(0, Number.parseFloat(hours) || 0);
  const rNum = Math.max(0, Number.parseFloat(rate) || 0);

  const baseHours = Math.min(hNum, 40);
  const otHours = Math.max(0, hNum - 40);

  const basePay = baseHours * rNum;
  const otRate = rNum * 1.5;
  const otPay = otHours * otRate;
  const total = basePay + otPay;

  const basePercent = total > 0 ? (basePay / total) * 100 : 100;
  const otPercent = total > 0 ? (otPay / total) * 100 : 0;

  const money = (value: number) =>
    value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handlePreset = (value: string) => {
    setActivePreset(value);
    setHours(value);
  };

  const adjustHours = (delta: number) => {
    const newValue = Math.max(0, hNum + delta);
    setHours(String(newValue));
    setActivePreset('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconBoxPrimary}>
            <MaterialIcons name="calculate" size={22} color="#3525cd" />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.subheading}>NÓMINA PRO</Text>
            <Text style={styles.headerTitle} numberOfLines={1}>
              Calculadora
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            accessibilityLabel="Notificaciones"
            onPress={() => {}}
          >
            <MaterialIcons
              name="notifications-none"
              size={22}
              color="#777587"
            />
          </TouchableOpacity>

          <View style={styles.avatarBox}>
            <MaterialIcons name="person" size={20} color="#ffffff" />
          </View>
        </View>
      </View>

      {/* Contenido desplazable */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <View style={styles.bannerIconBox}>
              <MaterialIcons name="verified" size={19} color="#3525cd" />
            </View>

            <View style={styles.bannerInfo}>
              <Text style={styles.bannerSub}>Régimen estándar</Text>
              <Text style={styles.bannerText}>
                Base 40 h · Horas extra a 1.5×
              </Text>
            </View>
          </View>

          <View style={styles.badgePrimary}>
            <Text style={styles.badgePrimaryText}>150%</Text>
          </View>
        </View>

        {/* Resumen del salario */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.labelMd}>Salario semanal estimado</Text>

            <View style={styles.liveBadge}>
              <View style={styles.dotPulse} />
              <Text style={styles.liveBadgeText}>Actualizado</Text>
            </View>
          </View>

          <View style={styles.heroAmountRow}>
            <Text style={styles.heroCurrency}>$</Text>
            <Text
              style={[
                styles.heroAmount,
                compact && styles.heroAmountCompact,
              ]}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {money(total)}
            </Text>
          </View>

          <Text style={styles.heroPeriod}>Total del período</Text>

          {/* Desglose */}
          <View style={styles.breakdownGrid}>
            <View style={styles.breakdownBoxBase}>
              <View style={styles.rowCenter}>
                <MaterialIcons name="schedule" size={15} color="#777587" />
                <Text style={styles.breakdownLabel}> Ordinarias</Text>
              </View>

              <Text
                style={styles.breakdownValue}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                ${money(basePay)}
              </Text>

              <Text style={styles.breakdownSub}>
                {money(baseHours)} h × ${money(rNum)}
              </Text>
            </View>

            <View style={styles.breakdownBoxOt}>
              <View style={styles.rowCenter}>
                <MaterialIcons name="bolt" size={15} color="#3525cd" />
                <Text style={styles.breakdownLabelOt}> Extras</Text>
              </View>

              <Text
                style={styles.breakdownValueOt}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                ${money(otPay)}
              </Text>

              <Text style={styles.breakdownSubOt}>
                {money(otHours)} h × ${money(otRate)}
              </Text>
            </View>
          </View>

          {/* Distribución */}
          <View style={styles.barContainer}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barBaseFill,
                  { width: `${basePercent}%` },
                ]}
              />
              <View
                style={[
                  styles.barOtFill,
                  { width: `${otPercent}%` },
                ]}
              />
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.barLabelText}>
                {Math.round(basePercent)}% base
              </Text>
              <Text style={styles.barLabelText}>
                {Math.round(otPercent)}% extra
              </Text>
            </View>
          </View>
        </View>

        {/* Formulario */}
        <View style={styles.formCard}>
          {/* Horas */}
          <View style={styles.inputGroup}>
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <MaterialIcons
                  name="hourglass-empty"
                  size={19}
                  color="#3525cd"
                />
                <Text style={styles.inputLabel}> Horas trabajadas</Text>
              </View>
            </View>

            <Text style={styles.helperText}>
              Selecciona una cantidad o escríbela.
            </Text>

            <View style={styles.presetsRow}>
              {['35', '40', '45', '50'].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.presetBtn,
                    activePreset === value && styles.presetBtnActive,
                  ]}
                  onPress={() => handlePreset(value)}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.presetText,
                      activePreset === value && styles.presetTextActive,
                    ]}
                  >
                    {value} h
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputFieldBox}>
              <TextInput
                style={styles.textInputStyle}
                keyboardType="decimal-pad"
                value={hours}
                onChangeText={(value) => {
                  setHours(value);
                  setActivePreset('');
                }}
                placeholder="Ej. 45"
                placeholderTextColor="#9995aa"
                accessibilityLabel="Horas trabajadas"
                selectTextOnFocus
              />

              <Text style={styles.unitText}>horas</Text>

              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => adjustHours(-1)}
                accessibilityLabel="Restar una hora"
              >
                <MaterialIcons name="remove" size={20} color="#181445" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.stepperBtn, styles.stepperAdd]}
                onPress={() => adjustHours(1)}
                accessibilityLabel="Sumar una hora"
              >
                <MaterialIcons name="add" size={20} color="#181445" />
              </TouchableOpacity>
            </View>

            <Text style={styles.otIndicatorText}>
              {otHours > 0
                ? `${money(otHours)} horas extra`
                : 'Sin horas extra'}
            </Text>
          </View>

          {/* Tarifa */}
          <View style={styles.inputGroup}>
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <MaterialIcons name="payments" size={19} color="#3525cd" />
                <Text style={styles.inputLabel}> Tarifa por hora</Text>
              </View>
            </View>

            <Text style={styles.helperText}>Moneda: dólares estadounidenses (USD).</Text>

            <View style={styles.inputFieldBox}>
              <Text style={styles.currencySymbol}>$</Text>

              <TextInput
                style={styles.textInputStyle}
                keyboardType="decimal-pad"
                value={rate}
                onChangeText={setRate}
                placeholder="Ej. 10.50"
                placeholderTextColor="#9995aa"
                accessibilityLabel="Tarifa por hora"
                selectTextOnFocus
              />
            </View>

            <View style={styles.quickRatesRow}>
              {['10', '15', '20'].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={styles.quickRateBtn}
                  onPress={() => setRate(`${value}.00`)}
                >
                  <Text style={styles.quickRateText}>${value}.00</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={Keyboard.dismiss}
            accessibilityRole="button"
          >
            <MaterialIcons name="calculate" size={20} color="#ffffff" />
            <Text style={styles.mainButtonText}>Ver salario calculado</Text>
          </TouchableOpacity>

          <Text style={styles.formFootnote}>
            El resultado se actualiza automáticamente al cambiar los valores.
          </Text>
        </View>

        {/* Información */}
        <View style={styles.infoBox}>
          <MaterialIcons
            name="info-outline"
            size={22}
            color="#3525cd"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Regla de horas extra</Text>
            <Text style={styles.infoDesc}>
              Esta calculadora aplica una tarifa de 1.5 veces la tarifa base
              a las horas que superan las 40 semanales. Es una estimación y
              no incluye impuestos ni deducciones.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Navegación inferior */}
      <View style={styles.bottomNav}>
        {[
          { name: 'calculate', label: 'Cálculo', active: true },
          { name: 'pie-chart', label: 'Deducciones', active: false },
          { name: 'compare-arrows', label: 'Comparar', active: false },
          { name: 'receipt-long', label: 'Historial', active: false },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.navItem}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <MaterialIcons
              name={item.name}
              size={21}
              color={item.active ? '#3525cd' : '#777587'}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.navText,
                item.active && styles.navTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NominaCalculator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fcf8ff',
  },

  header: {
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9e5ff',
    elevation: 2,
  },

  headerLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  headerTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 4,
  },

  iconBoxPrimary: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f0edff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subheading: {
    fontSize: 10,
    fontWeight: '700',
    color: '#777587',
    letterSpacing: 0.8,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#181445',
  },

  iconButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  avatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3525cd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    flex: 1,
  },

  scrollContainer: {
    padding: 14,
    paddingBottom: 24,
    gap: 14,
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: '#f6f2ff',
    padding: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e3dfff',
  },

  bannerLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  bannerInfo: {
    flex: 1,
    minWidth: 0,
  },

  bannerIconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#e9e4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bannerSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#777587',
    textTransform: 'uppercase',
    marginBottom: 2,
  },

  bannerText: {
    fontSize: 11,
    color: '#181445',
    lineHeight: 15,
  },

  badgePrimary: {
    backgroundColor: '#e2dfff',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3ccff',
  },

  badgePrimaryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3525cd',
  },

  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    gap: 11,
    shadowColor: '#181445',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9e5ff',
  },

  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7,
  },

  labelMd: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#777587',
  },

  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#e2dfff',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },

  dotPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3525cd',
  },

  liveBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#3525cd',
  },

  heroAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },

  heroCurrency: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3525cd',
  },

  heroAmount: {
    flexShrink: 1,
    fontSize: 38,
    fontWeight: '700',
    color: '#181445',
    letterSpacing: -1,
  },

  heroAmountCompact: {
    fontSize: 32,
  },

  heroPeriod: {
    fontSize: 11,
    color: '#777587',
    marginTop: -8,
  },

  breakdownGrid: {
    flexDirection: 'row',
    gap: 9,
  },

  breakdownBoxBase: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#f6f2ff',
    padding: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#e9e5ff',
    gap: 5,
  },

  breakdownBoxOt: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#f8f4ff',
    padding: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#ded5ff',
    gap: 5,
  },

  breakdownLabel: {
    flexShrink: 1,
    fontSize: 10,
    fontWeight: '600',
    color: '#777587',
  },

  breakdownLabelOt: {
    flexShrink: 1,
    fontSize: 10,
    fontWeight: '600',
    color: '#3525cd',
  },

  breakdownValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#181445',
  },

  breakdownValueOt: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3525cd',
  },

  breakdownSub: {
    fontSize: 10,
    color: '#777587',
  },

  breakdownSubOt: {
    fontSize: 10,
    color: '#6352bb',
  },

  barContainer: {
    gap: 7,
    paddingTop: 3,
  },

  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e9e5ff',
    flexDirection: 'row',
    overflow: 'hidden',
  },

  barBaseFill: {
    height: '100%',
    backgroundColor: '#3525cd',
  },

  barOtFill: {
    height: '100%',
    backgroundColor: '#8a4cfc',
  },

  barLabelText: {
    fontSize: 10,
    color: '#777587',
  },

  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    gap: 19,
    shadowColor: '#181445',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9e5ff',
  },

  inputGroup: {
    gap: 9,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181445',
  },

  helperText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#777587',
  },

  presetsRow: {
    flexDirection: 'row',
    gap: 7,
  },

  presetBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: '#f6f2ff',
    borderWidth: 1,
    borderColor: '#e9e5ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  presetBtnActive: {
    backgroundColor: '#3525cd',
    borderColor: '#3525cd',
  },

  presetText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#464555',
  },

  presetTextActive: {
    color: '#ffffff',
  },

  inputFieldBox: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f2ff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e9e5ff',
    gap: 7,
  },

  textInputStyle: {
    flex: 1,
    minWidth: 0,
    fontSize: 17,
    fontWeight: '600',
    color: '#181445',
    paddingHorizontal: 2,
    paddingVertical: 5,
  },

  currencySymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3525cd',
  },

  unitText: {
    fontSize: 11,
    color: '#777587',
  },

  stepperBtn: {
    width: 30,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#e9e5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepperAdd: {
    marginLeft: 0,
  },

  otIndicatorText: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '600',
    color: '#3525cd',
    backgroundColor: '#f0edff',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
  },

  quickRatesRow: {
    flexDirection: 'row',
    gap: 8,
  },

  quickRateBtn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 9,
    backgroundColor: '#e9e5ff',
    borderRadius: 8,
  },

  quickRateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3525cd',
  },

  mainButton: {
    minHeight: 48,
    paddingHorizontal: 10,
    backgroundColor: '#3525cd',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#3525cd',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 7,
    elevation: 3,
  },

  mainButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },

  formFootnote: {
    fontSize: 10,
    color: '#777587',
    textAlign: 'center',
    lineHeight: 15,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#f6f2ff',
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e3dfff',
  },

  infoContent: {
    flex: 1,
    minWidth: 0,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#181445',
    marginBottom: 4,
  },

  infoDesc: {
    fontSize: 11,
    color: '#625e78',
    lineHeight: 17,
  },

  bottomNav: {
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9e5ff',
    paddingHorizontal: 3,
    paddingVertical: 5,
    elevation: 8,
  },

  navItem: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 1,
    minHeight: 46,
  },

  navText: {
    fontSize: 9,
    color: '#777587',
    textAlign: 'center',
  },

  navTextActive: {
    fontSize: 9,
    fontWeight: '700',
    color: '#3525cd',
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
});
