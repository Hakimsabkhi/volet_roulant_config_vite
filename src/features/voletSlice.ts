import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dimensions {
  Largeur: number;
  Hauteur: number;
}

interface SelectedColor {
  coulisse: string;
  tablier: string;
  lameFinale: string;
}

interface VoletState {
  lameSelection: string;
  dimensions: Dimensions;
  selectedColor: SelectedColor;
  installationType: string;
  ManoeuvreType: string;
  ManualType: string;
  MotoriseType: string;
  TelecommandeType: string;
  CommandeType: string;
  InterrupteurType: string;
  SortieDeCableType: string;
}

const initialState: VoletState = {
  lameSelection: "", // Initial selection for lames
  dimensions: { Largeur: 1000, Hauteur: 1000 }, // Default dimensions
  selectedColor: {
    coulisse: "", // Initialize with default or empty string if no initial color
    tablier: "", // Initialize with default or empty string if no initial color
    lameFinale: "", // Initialize with default or empty string if no initial color
  },
  installationType: '',
  ManoeuvreType: "",
  ManualType: "",
  MotoriseType: "",
  TelecommandeType: "",
  CommandeType: "",
  InterrupteurType: "",
  SortieDeCableType: "",
};

const voletSlice = createSlice({
  name: 'volet',
  initialState,
  reducers: {
    setLameSelection: (state, action: PayloadAction<string>) => {
      state.lameSelection = action.payload;
    },
    setDimensions: (state, action: PayloadAction<Partial<Dimensions>>) => {
      state.dimensions = { ...state.dimensions, ...action.payload };
    },
    setColor: (state, action: PayloadAction<{ color: string; category: keyof SelectedColor }>) => {
      const { color, category } = action.payload;
      if (category in state.selectedColor) {
        state.selectedColor[category] = color;
      }
    },
    setInstallationType: (state, action: PayloadAction<string>) => {
      state.installationType = action.payload;
    },
    setManoeuvreType: (state, action: PayloadAction<string>) => {
      state.ManoeuvreType = action.payload;
    },
    setManualType: (state, action: PayloadAction<string>) => {
      state.ManualType = action.payload;
    },
    setMotoriseType: (state, action: PayloadAction<string>) => {
      state.MotoriseType = action.payload;
    },
    setTelecommandeType: (state, action: PayloadAction<string>) => {
      state.TelecommandeType = action.payload;
    },
    setCommandeType: (state, action: PayloadAction<string>) => {
      state.CommandeType = action.payload;
    },
    setInterrupteurType: (state, action: PayloadAction<string>) => {
      state.InterrupteurType = action.payload;
    },
    setSortieDeCableType: (state, action: PayloadAction<string>) => {
      state.SortieDeCableType = action.payload;
    },
  },
});

export const {
  setLameSelection,
  setDimensions,
  setColor,
  setInstallationType,
  setManoeuvreType,
  setManualType,
  setMotoriseType,
  setTelecommandeType,
  setCommandeType,
  setInterrupteurType,
  setSortieDeCableType
} = voletSlice.actions;

export const selectInstallationType = (state: { volet: VoletState }) => state.volet.installationType;
export const selectSelectedColor = (state: { volet: VoletState }) => state.volet.selectedColor;
export const selectDimensions = (state: { volet: VoletState }) => state.volet.dimensions;
export const selectColorForCategory = (category: keyof SelectedColor) => (state: { volet: VoletState }): string => state.volet.selectedColor[category];
export const selectManoeuvre = (state: { volet: VoletState }) => state.volet.ManoeuvreType;
export const selectManual = (state: { volet: VoletState }) => state.volet.ManualType;
export const selectMotorise = (state: { volet: VoletState }) => state.volet.MotoriseType;
export const selectTelecommand = (state: { volet: VoletState }) => state.volet.TelecommandeType;
export const selectCommand = (state: { volet: VoletState }) => state.volet.CommandeType;
export const selectInterrupteur = (state: { volet: VoletState }) => state.volet.InterrupteurType;
export const selectSortieDeCable = (state: { volet: VoletState }) => state.volet.SortieDeCableType;

export default voletSlice.reducer;
