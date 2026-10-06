import { apiClient } from './api';
import { LabReagent, TitrationDataPoint, TitrationSession } from '../types/chemistry';
import { LAB_REAGENTS } from '../data/labReagentsData';

export const experimentsService = {
  async getReagents(): Promise<LabReagent[]> {
    const res = await apiClient.get<LabReagent[]>('/lab/reagents', LAB_REAGENTS);
    return res.data;
  },

  /**
   * Generates analytical pH and conductivity for strong acid (HCl) titrated with strong base (NaOH).
   * Analyte: 25.00 mL of 0.1000 M HCl
   * Titrant: 0.1000 M NaOH
   * Equivalence Point: 25.00 mL (pH = 7.00)
   */
  calculateTitrationStep(
    volumeAdded: number,
    initialVolume = 25.0,
    acidConc = 0.1,
    baseConc = 0.1
  ): TitrationDataPoint {
    const molAcidInitial = (initialVolume / 1000) * acidConc;
    const molBaseAdded = (volumeAdded / 1000) * baseConc;
    const totalVolume = (initialVolume + volumeAdded) / 1000; // Liters

    let currentPh = 7.0;
    let conductivity = 15.0; // mS/cm

    if (volumeAdded < 25.0) {
      // Before equivalence point: excess H+
      const molExcessH = molAcidInitial - molBaseAdded;
      const concH = molExcessH / totalVolume;
      currentPh = Math.max(1.0, -Math.log10(concH));
      conductivity = 35.0 - (volumeAdded / 25.0) * 22.0; // Decreasing due to H+ consumption
    } else if (Math.abs(volumeAdded - 25.0) < 0.05) {
      // Equivalence point
      currentPh = 7.0;
      conductivity = 13.0; // NaCl alone
    } else {
      // After equivalence point: excess OH-
      const molExcessOH = molBaseAdded - molAcidInitial;
      const concOH = molExcessOH / totalVolume;
      const pOH = -Math.log10(concOH);
      currentPh = Math.min(13.0, 14.0 - pOH);
      conductivity = 13.0 + ((volumeAdded - 25.0) / 25.0) * 18.0; // Increasing due to OH-
    }

    const temp = 25.0 + Math.min(3.2, (volumeAdded / 25.0) * 2.8); // Mild neutralization exotherm

    return {
      volumeAdded: Number(volumeAdded.toFixed(2)),
      pH: Number(currentPh.toFixed(2)),
      conductivity: Number(conductivity.toFixed(1)),
      temperature: Number(temp.toFixed(1)),
    };
  },

  createInitialSession(): TitrationSession {
    const titrant = LAB_REAGENTS.find((r) => r.id === 'naoh') || LAB_REAGENTS[0];
    const analyte = LAB_REAGENTS.find((r) => r.id === 'hcl') || LAB_REAGENTS[1];

    const initialPoint = this.calculateTitrationStep(0);

    return {
      titrant,
      analyte,
      indicator: 'Phenolphthalein',
      initialAnalyteVolume: 25.0,
      titrantVolumeAdded: 0,
      currentPh: initialPoint.pH,
      equivalencePointVolume: 25.0,
      isEndpointReached: false,
      stirrerActive: true,
      stirrerRpm: 450,
      buretteDripRate: 0,
      dataPoints: [initialPoint],
    };
  }
};
