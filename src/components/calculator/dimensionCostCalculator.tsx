// calculator/DimensionCostCalculator.tsx
import React, { useEffect } from 'react';

interface Dimensions {
  Largeur: number;
  Hauteur: number;
}

interface DimensionCostCalculatorProps {
  dimensions: Dimensions;
  onCostCalculated: (cost: number) => void;
}

const DimensionCostCalculator: React.FC<DimensionCostCalculatorProps> = ({ dimensions, onCostCalculated }) => {
  const area = dimensions.Largeur * dimensions.Hauteur;
  const DimensionCost = 0.00018 * area + 256.04298;

  useEffect(() => {
    onCostCalculated(DimensionCost);
  }, [DimensionCost, onCostCalculated]);

  return null;
}

export default DimensionCostCalculator;
