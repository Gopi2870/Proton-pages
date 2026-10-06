// Rigorous Physical and Chemical Unit Conversion Utility

export class PressureConverter {
  static atmToPascal(atm: number): number {
    return atm * 101325;
  }
  static pascalToAtm(pa: number): number {
    return pa / 101325;
  }
  static atmToTorr(atm: number): number {
    return atm * 760;
  }
  static torrToAtm(torr: number): number {
    return torr / 760;
  }
  static barToAtm(bar: number): number {
    return bar / 1.01325;
  }
  static atmToBar(atm: number): number {
    return atm * 1.01325;
  }
}

export class TemperatureConverter {
  static celsiusToKelvin(c: number): number {
    return c + 273.15;
  }
  static kelvinToCelsius(k: number): number {
    return k - 273.15;
  }
  static fahrenheitToCelsius(f: number): number {
    return ((f - 32) * 5) / 9;
  }
  static celsiusToFahrenheit(c: number): number {
    return (c * 9) / 5 + 32;
  }
}

export class EnergyConverter {
  static joulesToKcal(j: number): number {
    return j / 4184;
  }
  static kcalToJoules(kcal: number): number {
    return kcal * 4184;
  }
  static evToJoules(ev: number): number {
    return ev * 1.602176634e-19;
  }
  static joulesToEv(j: number): number {
    return j / 1.602176634e-19;
  }
  static hartreeToKjMol(hartree: number): number {
    return hartree * 2625.5;
  }
}

export class ConcentrationConverter {
  static molarityToPpm(molarityM: number, molarMassGmol: number, solventDensityGml: number = 1.0): number {
    return (molarityM * molarMassGmol * 1000) / solventDensityGml;
  }
  static ppmToMolarity(ppm: number, molarMassGmol: number, solventDensityGml: number = 1.0): number {
    return (ppm * solventDensityGml) / (molarMassGmol * 1000);
  }
}
