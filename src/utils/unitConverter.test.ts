import { describe, it, expect } from 'vitest';
import {
  PressureConverter,
  TemperatureConverter,
  EnergyConverter,
  ConcentrationConverter,
} from './unitConverter';

describe('Unit Converters Suite', () => {
  describe('PressureConverter', () => {
    it('converts between standard atmospheres and Pascals', () => {
      expect(PressureConverter.atmToPascal(1.0)).toBe(101325);
      expect(PressureConverter.pascalToAtm(101325)).toBeCloseTo(1.0, 5);
    });

    it('converts between atmospheres and Torr', () => {
      expect(PressureConverter.atmToTorr(1.0)).toBe(760);
      expect(PressureConverter.torrToAtm(760)).toBeCloseTo(1.0, 5);
    });
  });

  describe('TemperatureConverter', () => {
    it('converts Celsius and Kelvin accurately', () => {
      expect(TemperatureConverter.celsiusToKelvin(25.0)).toBeCloseTo(298.15, 2);
      expect(TemperatureConverter.kelvinToCelsius(273.15)).toBeCloseTo(0.0, 2);
    });

    it('converts Fahrenheit and Celsius', () => {
      expect(TemperatureConverter.fahrenheitToCelsius(32)).toBeCloseTo(0, 2);
      expect(TemperatureConverter.fahrenheitToCelsius(212)).toBeCloseTo(100, 2);
      expect(TemperatureConverter.celsiusToFahrenheit(100)).toBeCloseTo(212, 2);
    });
  });

  describe('EnergyConverter', () => {
    it('converts Joules and kcal', () => {
      expect(EnergyConverter.joulesToKcal(4184)).toBeCloseTo(1.0, 3);
      expect(EnergyConverter.kcalToJoules(1.0)).toBe(4184);
    });

    it('converts eV and Joules', () => {
      const joules = EnergyConverter.evToJoules(1.0);
      expect(joules).toBeCloseTo(1.602e-19, 21);
      expect(EnergyConverter.joulesToEv(joules)).toBeCloseTo(1.0, 3);
    });
  });

  describe('ConcentrationConverter', () => {
    it('converts molarity to ppm and back', () => {
      // 0.01 M NaCl (molar mass = 58.44 g/mol)
      // ppm = 0.01 * 58.44 * 1000 = 584.4 ppm
      const ppm = ConcentrationConverter.molarityToPpm(0.01, 58.44);
      expect(ppm).toBeCloseTo(584.4, 2);

      const m = ConcentrationConverter.ppmToMolarity(584.4, 58.44);
      expect(m).toBeCloseTo(0.01, 3);
    });
  });
});
