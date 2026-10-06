// Scientific Computational Engines for Proton Pages

export interface ReactionThermodynamicsResult {
  deltaH0Kj: number;
  deltaS0Jk: number;
  deltaG0Kj: number;
  isSpontaneousAt298K: boolean;
  equilibriumConstantKeq: number;
  crossoverTemperatureK?: number;
}

export class ThermodynamicsCalculator {
  static readonly R_GAS_CONSTANT_J_MOL_K = 8.314462618;

  static calculateGibbsFreeEnergy(deltaH_kj: number, deltaS_j: number, tempK: number = 298.15): number {
    return deltaH_kj - (tempK * deltaS_j) / 1000.0;
  }

  static calculateEquilibriumConstant(deltaG_kj: number, tempK: number = 298.15): number {
    const deltaG_joules = deltaG_kj * 1000.0;
    const exponent = -deltaG_joules / (this.R_GAS_CONSTANT_J_MOL_K * tempK);
    return Math.exp(Math.max(-700, Math.min(700, exponent)));
  }

  static analyzeReaction(deltaH_kj: number, deltaS_j: number, tempK: number = 298.15): ReactionThermodynamicsResult {
    const deltaG = this.calculateGibbsFreeEnergy(deltaH_kj, deltaS_j, tempK);
    const keq = this.calculateEquilibriumConstant(deltaG, tempK);
    let crossover: number | undefined;
    if (deltaS_j !== 0) {
      crossover = (deltaH_kj * 1000.0) / deltaS_j;
    }
    return {
      deltaH0Kj: deltaH_kj,
      deltaS0Jk: deltaS_j,
      deltaG0Kj: deltaG,
      isSpontaneousAt298K: deltaG < 0,
      equilibriumConstantKeq: keq,
      crossoverTemperatureK: crossover && crossover > 0 ? crossover : undefined
    };
  }

  static vanTHoffTemperatureShift(deltaH_kj: number, k1: number, t1_k: number, t2_k: number): number {
    const deltaH_j = deltaH_kj * 1000.0;
    const factor = -(deltaH_j / this.R_GAS_CONSTANT_J_MOL_K) * (1 / t2_k - 1 / t1_k);
    return k1 * Math.exp(factor);
  }
}

export class KineticsCalculator {
  static readonly R_GAS = 8.314462618;

  static arrheniusRateConstant(preExponentialFactorA: number, activationEnergyKj: number, tempK: number): number {
    const ea_joules = activationEnergyKj * 1000.0;
    return preExponentialFactorA * Math.exp(-ea_joules / (this.R_GAS * tempK));
  }

  static firstOrderConcentration(initialConcM: number, rateConstantK: number, timeSeconds: number): number {
    return initialConcM * Math.exp(-rateConstantK * timeSeconds);
  }

  static firstOrderHalfLife(rateConstantK: number): number {
    return Math.LN2 / rateConstantK;
  }

  static secondOrderConcentration(initialConcM: number, rateConstantK: number, timeSeconds: number): number {
    return initialConcM / (1 + rateConstantK * timeSeconds * initialConcM);
  }

  static secondOrderHalfLife(rateConstantK: number, initialConcM: number): number {
    return 1 / (rateConstantK * initialConcM);
  }
}

export class ElectrochemistryCalculator {
  static readonly FARADAY_CONSTANT = 96485.33212; // C / mol e-
  static readonly R_GAS = 8.314462618;

  static nernstPotential(standardCellPotentialV: number, electronsTransferredN: number, reactionQuotientQ: number, tempK: number = 298.15): number {
    if (reactionQuotientQ <= 0) return standardCellPotentialV;
    const factor = (this.R_GAS * tempK) / (electronsTransferredN * this.FARADAY_CONSTANT);
    return standardCellPotentialV - factor * Math.log(reactionQuotientQ);
  }

  static deltaGFromPotential(standardCellPotentialV: number, electronsTransferredN: number): number {
    const deltaG_joules = -electronsTransferredN * this.FARADAY_CONSTANT * standardCellPotentialV;
    return deltaG_joules / 1000.0; // in kJ/mol
  }

  static faradayElectrolysisMass(currentAmperes: number, timeSeconds: number, molarMassGmol: number, valenceElectronsZ: number): number {
    const totalChargeCoulombs = currentAmperes * timeSeconds;
    const molesElectrons = totalChargeCoulombs / this.FARADAY_CONSTANT;
    const molesSubstance = molesElectrons / valenceElectronsZ;
    return molesSubstance * molarMassGmol;
  }
}

export class AcidBaseCalculator {
  static calculatePH(hydroniumConcentrationM: number): number {
    if (hydroniumConcentrationM <= 0) return 7.0;
    return -Math.log10(hydroniumConcentrationM);
  }

  static calculatePOH(hydroxideConcentrationM: number): number {
    if (hydroxideConcentrationM <= 0) return 7.0;
    return -Math.log10(hydroxideConcentrationM);
  }

  static hendersonHasselbalchBufferPH(pKa: number, conjugateBaseConcM: number, weakAcidConcM: number): number {
    if (weakAcidConcM <= 0 || conjugateBaseConcM <= 0) return pKa;
    return pKa + Math.log10(conjugateBaseConcM / weakAcidConcM);
  }

  static weakAcidPH(initialConcM: number, ka: number): number {
    // Solves x^2 + Ka*x - Ka*C = 0 quadratic
    const b = ka;
    const c = -ka * initialConcM;
    const x = (-b + Math.sqrt(b * b - 4 * c)) / 2;
    return this.calculatePH(x);
  }
}

export class QuantumChemistryCalculator {
  static readonly PLANCK_CONSTANT = 6.62607015e-34; // J * s
  static readonly SPEED_OF_LIGHT = 2.99792458e8; // m / s
  static readonly ELECTRON_MASS_KG = 9.1093837e-31; // kg

  static photonEnergyJoules(wavelengthNm: number): number {
    const wavelengthM = wavelengthNm * 1e-9;
    return (this.PLANCK_CONSTANT * this.SPEED_OF_LIGHT) / wavelengthM;
  }

  static photonEnergyEv(wavelengthNm: number): number {
    return this.photonEnergyJoules(wavelengthNm) / 1.602176634e-19;
  }

  static particleIn1DBoxEnergyJoules(quantumNumberN: number, boxLengthNm: number, massKg: number = this.ELECTRON_MASS_KG): number {
    const lengthM = boxLengthNm * 1e-9;
    const numerator = Math.pow(quantumNumberN, 2) * Math.pow(this.PLANCK_CONSTANT, 2);
    const denominator = 8 * massKg * Math.pow(lengthM, 2);
    return numerator / denominator;
  }
}
