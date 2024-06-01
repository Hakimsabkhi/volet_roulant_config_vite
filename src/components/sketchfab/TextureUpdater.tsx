import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectColorForCategory } from '../../features/voletSlice';
import { ColorImages } from '../../assets/Data';
import { RootState } from '../../store'; // Adjust the path according to your project structure

interface TextureUpdaterProps {
  apiClient: any;
  category: keyof typeof ColorImages;
  materialId: string;
  currentTexture: string;
  setTexture: React.Dispatch<React.SetStateAction<string>>;
}

const TextureUpdater: React.FC<TextureUpdaterProps> = ({ apiClient, category, materialId, currentTexture, setTexture }) => {
  const selectedColor = useSelector((state: RootState) => selectColorForCategory(category)(state));
  const color = selectedColor as keyof typeof ColorImages[typeof category] || 'Blanc';

  useEffect(() => {
    const updateTextureAndMaterial = () => {
      const textureURL = ColorImages[category][color];
      if (!textureURL) return;

      apiClient.updateTexture(textureURL, currentTexture, (err: any, newTextureUid: string) => {
        if (err) return;

        apiClient.getMaterialList((err: any, materials: any[]) => {
          if (err) return;

          const materialToUpdate = materials.find((material: any) => material.id === materialId);
          if (!materialToUpdate) return;

          if (materialToUpdate.channels.AlbedoPBR) {
            materialToUpdate.channels.AlbedoPBR.texture.uid = newTextureUid;
          }

          apiClient.setMaterial(materialToUpdate, (err: any) => {
            if (err) return;
            setTexture(newTextureUid);
          });
        });
      });
    };

    if (apiClient) {
      updateTextureAndMaterial();
    }
  }, [apiClient, color, category, currentTexture, materialId, setTexture]);

  return null;
};

export default TextureUpdater;
