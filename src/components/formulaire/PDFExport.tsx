import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import "./PDFExport.css";

import {
  motoriseOptions,
  interrupteurOptions,
  telecommandeOptions,
  manualOptions,
  sortieDeCableOptions,
  controlOptions,
  poseOptions,
  lameChoices,
} from "../../assets/Data";

interface Dimensions {
  Largeur: number;
  Hauteur: number;
}

interface Colors {
  coulisse: string;
  tablier: string;
  lameFinale: string;
}

interface VoletState {
  selectedColor: Colors;
  lameSelection: string;
  dimensions: Dimensions;
  installationType: string;
  ManoeuvreType: string;
  ManualType: string;
  MotoriseType: string;
  TelecommandeType: string;
  InterrupteurType: string;
  SortieDeCableType: string;
}

interface RootState {
  volet: VoletState;
}

const getPrice = (options: any[], selectedOption: string) => {
  const option = options.find((option) => option.label === selectedOption);
  return option ? option.price : 0;
};

const PDFExport: React.FC<{ dimensionCost: number; totalPrice: number }> = ({
  dimensionCost,
  totalPrice,
}) => {
  const selectedCoulisseColor = useSelector(
    (state: RootState) => state.volet.selectedColor.coulisse
  );
  const selectedTablierColor = useSelector(
    (state: RootState) => state.volet.selectedColor.tablier
  );
  const selectedLameFinaleColor = useSelector(
    (state: RootState) => state.volet.selectedColor.lameFinale
  );
  const lameSelection = useSelector(
    (state: RootState) => state.volet.lameSelection
  );
  const dimensions = useSelector((state: RootState) => state.volet.dimensions);
  const installationType = useSelector(
    (state: RootState) => state.volet.installationType
  );
  const ManoeuvreType = useSelector(
    (state: RootState) => state.volet.ManoeuvreType
  );
  const ManualType = useSelector((state: RootState) => state.volet.ManualType);
  const MotoriseType = useSelector(
    (state: RootState) => state.volet.MotoriseType
  );
  const TelecommandeType = useSelector(
    (state: RootState) => state.volet.TelecommandeType
  );
  const InterrupteurType = useSelector(
    (state: RootState) => state.volet.InterrupteurType
  );
  const SortieDeCableType = useSelector(
    (state: RootState) => state.volet.SortieDeCableType
  );

  const base64Logo =
    "data:image/png;base64,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"; // Replace this with your actual Base64 string

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add company logo
    doc.addImage(base64Logo, "PNG", 10, 10, 80, 20);

    // Add company details
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text("volet store", 10, 40);
    doc.text("Paris", 10, 45);
    doc.text("Address Line 2", 10, 50);
    doc.text("Phone: +123456789", 10, 55);
    doc.text("Email: contact@voletstore.fr", 10, 60);

    // Add client details
    doc.text("Client Name", 140, 40);
    doc.text("Client Address Line 1", 140, 45);
    doc.text("Client Address Line 2", 140, 50);
    doc.text("Client Phone", 140, 55);
    doc.text("Client Email", 140, 60);

    // Add table with details
    (doc as any).autoTable({
      startY: 70,
      head: [["Description", "Détails", "Prix"]],
      body: [
        [
          "Type de Lame",
          lameSelection,
          `${getPrice(lameChoices, lameSelection)}€`,
        ],
        [
          "Dimensions",
          `Largeur: ${dimensions.Largeur} mm, Hauteur: ${dimensions.Hauteur} mm`,
          `${dimensionCost.toFixed(2)}€`,
        ],
        [
          "Type d'Installation",
          installationType,
          `${getPrice(poseOptions, installationType)}€`,
        ],
        [
          "Couleurs",
          `Coulisse: ${selectedCoulisseColor} / Tablier: ${selectedTablierColor} / Lame Finale: ${selectedLameFinaleColor}`,
          "30€",
        ],
        [
          "Type de Manoeuvre",
          ManoeuvreType,
          `${getPrice(controlOptions, ManoeuvreType)}€`,
        ],
        ...(ManoeuvreType === "Manuel"
          ? [
              [
                "Outil de commande",
                ManualType,
                `${getPrice(manualOptions, ManualType)}€`,
              ],
            ]
          : []),
        ...(ManoeuvreType === "Motorisé"
          ? [
              [
                "Type de motorisation",
                MotoriseType,
                `${getPrice(motoriseOptions, MotoriseType)}€`,
              ],
              ...(MotoriseType === "Radio"
                ? [
                    [
                      "Télécommande",
                      TelecommandeType,
                      `${getPrice(telecommandeOptions, TelecommandeType)}€`,
                    ],
                  ]
                : []),
              ...(MotoriseType === "Filaire"
                ? [
                    [
                      "Interrupteur",
                      InterrupteurType,
                      `${getPrice(interrupteurOptions, InterrupteurType)}€`,
                    ],
                    [
                      "Sortie de cable",
                      SortieDeCableType,
                      `${getPrice(sortieDeCableOptions, SortieDeCableType)}€`,
                    ],
                  ]
                : []),
            ]
          : []),
      ],
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: "left",
        valign: "middle",
        fillColor: [255, 255, 255], // Cell background color
        textColor: [0, 0, 0], // Cell text color
      },
      headStyles: {
        fillColor: [0, 102, 204], // Header background color
        textColor: [255, 255, 255], // Header text color
      },
      columnStyles: {
        2: { halign: "right" }, // Align prices to the right
      },
    });

    // Add total price
    (doc as any).autoTable({
      startY: (doc as any).previousAutoTable.finalY + 10,
      body: [
        ['Total HT', `${totalPrice.toFixed(2)}€`],
        ['Total TTC', `${(totalPrice * 1.2).toFixed(2)}€`]
      ],
      theme: 'grid',
      styles: {
        fontSize: 12,
        cellPadding: 4,
        halign: 'left',
        fillColor: [220, 220, 220],  // Cell background color for total
        textColor: [0, 0, 0]         // Cell text color for total
      },
      headStyles: {
        fillColor: [0, 102, 204],  // Header background color for total
        textColor: [255, 255, 255] // Header text color for total
      },
      tableWidth: 'wrap',  // Adjust the table width to fit the content
      margin: { left: 145 }  // Center the table horizontally (assuming page width is 210mm)
    });
    
    
    doc.save("Devis.pdf");
  };

  return (
    <button onClick={exportToPDF} className="nav-btn">
      Télécharger mon Devis
    </button>
  );
};

export default PDFExport; // i mean put the first line the Total
