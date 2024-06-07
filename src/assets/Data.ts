

import { 
  Filaire, 
  Radio, 
  Droite, 
  Gauche, 
  Manuel, 
  MoteurBeker, 
  SousLanteau, 
  SousLanteauInverse, 
  EnApplique, 
  AppliqueEncastre, 
  AppliqueEnApplique, 
  Sangle, 
  Manivelle, 
  Lame41Image, 
  Lame55Image 
} from './imageModule';

const motoriseOptions = [
  { label: 'Filaire', description: 'Description for Motorisé 1', image: Filaire },
  { label: 'Radio', description: 'Description for Motorisé 2', image: Radio }
];

const interrupteurOptions = [
  { label: 'Sans', description: "Pas d'interrupteur", image: ('../../assets/none.png') },
  { label: 'Encastree', description: 'Interrupteur encastré', image: AppliqueEncastre },
  { label: 'En applique', description: 'Interrupteur en applique', image: AppliqueEnApplique }
];

const telecommandeOptions = [
  { label: 'Sans', description: 'Sans télécommande', image: ('../../assets/Encastree.png') },
  { label: 'Avec', description: 'Avec télécommande', image: ('../../assets/EnApplique.png') }
];

const commandeOptions = [
  { label: 'Emetteur mural', description: 'Interrupteur encastré', image: ('../../assets/Encastree.png') },
  { label: 'Télécommande', description: 'Interrupteur en applique', image: ('../../assets/EnApplique.png') }
];

const manualOptions = [
  { label: 'Manivelle', description: 'Description for Manuel 1', image: Manivelle },
  { label: 'Sangle', description: 'Description for Manuel 2', image: Sangle }
];

const sortieDeCableOptions = [
  { label: 'Gauche', description: 'Sortie de câble à gauche', image: Droite },
  { label: 'Droite', description: 'Sortie de câble à droite', image: Gauche }
];

const controlOptions = [
  { label: 'Manuel', description: 'Fonctionne par une commande manuelle.', image: Manuel },
  { label: 'Motorisé', description: 'Actionné électriquement', image: MoteurBeker }
];

const poseOptions = [
  { label: 'sous lanteau', description: 'Coffre pan coupé ou quart de rond aluminium différentes couleurs', image: SousLanteau },
  { label: 'sous lanteau inverse', description: 'Coffre pan coupé ou quart de rond aluminium différentes couleurs', image: SousLanteauInverse },
  { label: 'En applique', description: 'Coffre pan coupé ou quart de rond aluminium différentes couleurs', image: EnApplique }
];

const lameChoices = [
  { label: 'Lame 41', description: 'Lames en Aluminium plié et injectées de mousse isolante.', image: Lame41Image },
  { label: 'Lame 55', description: 'Lame volet roulant aluminium isolée 55x14.', image: Lame55Image }
];

const manoeuvreConfig = [
  "Outil De Commande",
  "Type de Motorisation (marque : Becker)",
  "Type de Motorisation (marque : Becker)",
  "Interrupteur",
  "Sortie de câble"
];

interface ColorOptions {
  [key: string]: {
    'Blanc': string;
    'Gris-clair': string;
    'Gris-métallique': string;
    'Gris-anthracite': string;
    'Marron': string;
    'Chêne-doré': string;
  };
}

const ColorImages: ColorOptions = {
  coulisse: {
    'Blanc': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717002309/coulisse_couleur/couleur_coulisse_blanc.png',
    'Gris-clair': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1716991573/coulisse_couleur/couleur_coulisse_gris_claire.png',
    'Gris-métallique': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717691196/coulisse_couleur/couleur_coulisse_gris_metallique.png',
    'Gris-anthracite': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1716991564/coulisse_couleur/couleur_coulisse_gris_antracite.png',
    'Marron': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717684805/coulisse_couleur/couleur_coulisse_marron.png',
    'Chêne-doré': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717753164/coulisse_couleur/couleur_coulise_chene__dore.png'
  },
  tablier: {
    'Blanc': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717001686/tablier_couleur/couleur_tablier_blanc.png',
    'Gris-clair': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1716991588/tablier_couleur/couleur_tablier_gris_claire.png',
    'Gris-métallique': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717690624/tablier_couleur/couleur_tablier_gris_metallique.png',
    'Gris-anthracite': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1716991584/tablier_couleur/couleur_tablier_gris_anthracite.png',
    'Marron': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717690536/tablier_couleur/couleur_tablier_marron.png',
    'Chêne-doré': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717750535/tablier_couleur/couleur_tablier_chene_dore.png'
  },
  lameFinale: {
    'Blanc': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717001851/lame_fianle_couleur/couleur_lame_finale_blanc.png',
    'Gris-clair': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1716991499/lame_fianle_couleur/couleur_lame_finale_gris_clair.png',
    'Gris-métallique': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717691257/lame_fianle_couleur/couleur_lame_finale_gris_metallique.png',
    'Gris-anthracite': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1716991496/lame_fianle_couleur/couleur_lame_finale_gris_antracite.png',
    'Marron': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717684608/lame_fianle_couleur/couleur_lame_finale_marron.png',
    'Chêne-doré': 'https://res.cloudinary.com/dtbjrviyf/image/upload/v1717750526/lame_fianle_couleur/couleur_lame_finale_chene.png'
  }
};

export { 
  motoriseOptions, 
  interrupteurOptions, 
  commandeOptions, 
  telecommandeOptions, 
  manualOptions, 
  sortieDeCableOptions, 
  controlOptions, 
  poseOptions, 
  lameChoices, 
  manoeuvreConfig,
  ColorImages
};
