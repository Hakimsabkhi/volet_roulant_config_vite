import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectInstallationType, selectColorForCategory } from '../../features/voletSlice';
import './Viewer.css';
import logo from '../../assets/logo.svg';
import { ColorImages } from '../../assets/Data';

interface ViewerProps {
  setPosition: (position: { x: number; y: number; z: number }) => void;
  setTarget: (target: { x: number; y: number; z: number }) => void;
}

interface CameraLookAt {
  position: [number, number, number];
  target: [number, number, number];
}

interface ApiClient {
  start: (options: { preload: number }) => void;
  stop: () => void;
  addEventListener: (event: string, callback: (camera: any) => void) => void;
  setUserInteraction: (enabled: boolean, callback: (err: any) => void) => void;
  getCameraLookAt: (callback: (err: any, cameraLookAt: CameraLookAt) => void) => void;
  getNodeMap: (callback: (err: any, nodes: any[]) => void) => void;
  hide: (nodeID: number, callback: (err: any) => void) => void;
  show: (nodeID: number, callback: (err: any) => void) => void;
  getMaterialList: (callback: (err: any, materials: any[]) => void) => void;
  getTextureList: (callback: (err: any, textures: any[]) => void) => void;
  updateTexture: (textureURL: string, textureUid: string, callback: (err: any, newTextureUid: string) => void) => void;
  setMaterial: (material: any, callback: (err: any) => void) => void;
  setCameraLookAt: (position: { x: number; y: number; z: number }, target: { x: number; y: number; z: number }, callback: (err: any) => void) => void;
  setCamera: (options: { rotation: [number, number, number] }) => void;
}

declare global {
  interface Window {
    Sketchfab: any;
  }
}

const Viewer: React.FC<ViewerProps> = ({ setPosition, setTarget }) => {
  const [apiClient, setApiClient] = useState<ApiClient | null>(null);
  const [userInteractionEnabled, setUserInteractionEnabled] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [nodes, setNodes] = useState<any[]>([]);
  const [textures, setTextures] = useState<any[]>([]);
  const [coulisseTexture, setCoulisseTexture] = useState<string>('b6b006b6f4dc40979626a43f06ddde51');
  const [tablierTexture, setTablierTexture] = useState<string>('6817519cbd514337b622afc9e3363f4a');
  const [lameFinaleTexture, setLameFinaleTexture] = useState<string>('988529fe9fed4686bbc84f805d224849');

  const installationType = useSelector(selectInstallationType);
  const coulisseColor = useSelector(selectColorForCategory('coulisse')) || 'Blanc';
  const tablierColor = useSelector(selectColorForCategory('tablier')) || 'Blanc';
  const lameFinaleColor = useSelector(selectColorForCategory('lameFinale')) || 'Blanc';

  useEffect(() => {
    const iframe = document.getElementById('sketchfab-viewer') as HTMLIFrameElement;
    let intervalId: NodeJS.Timeout | null = null;

    if (window.Sketchfab) {
      const client = new window.Sketchfab(iframe);
      client.init('ae4228d6188f4173b38ed51ab744ba62', {
        success: (api: ApiClient) => {
          api.start({ preload: 1 });
          api.addEventListener('viewerready', () => {
            console.log('Viewer is ready');
            setApiClient(api);

            api.setUserInteraction(userInteractionEnabled, (err: any) => {
              if (err) {
                console.error('Failed to set user interaction:', err);
              } else {
                console.log(`Initial user interaction set to ${userInteractionEnabled}`);
              }
            });

            const updateCameraDetails = () => {
              api.getCameraLookAt((err: any, cameraLookAt: CameraLookAt) => {
                if (!err) {
                  setPosition({
                    x: cameraLookAt.position[0],
                    y: cameraLookAt.position[1],
                    z: cameraLookAt.position[2]
                  });
                  setTarget({
                    x: cameraLookAt.target[0],
                    y: cameraLookAt.target[1],
                    z: cameraLookAt.target[2]
                  });
                }
              });
            };

            updateCameraDetails();
            intervalId = setInterval(updateCameraDetails, 5000);
            getNodeMap(api);

            api.hide(3, (err: any) => {
              if (!err) {
                console.log('Node 3 is initially hidden');
              } else {
                console.error('Failed to hide node 3:', err);
              }
            });

            api.hide(182, (err: any) => {
              if (!err) {
                console.log('Node 182 is initially hidden');
              } else {
                console.error('Failed to hide node 182:', err);
              }
            });

            api.show(97, (err: any) => {
              if (!err) {
                console.log('Node 97 is initially shown');
              } else {
                console.error('Failed to show node 97:', err);
              }
            });

            api.getMaterialList((err: any, materials: any[]) => {
              if (!err) {
                console.log('Materials:', materials);
              } else {
                console.error('Failed to get material list:', err);
              }
            });

            api.getTextureList((err: any, textures: any[]) => {
              if (!err) {
                console.log('Textures:', textures);
                setTextures(textures);
              } else {
                console.error('Failed to get texture list:', err);
              }
            });
          });
        },
        error: () => console.error('Sketchfab API failed to initialize'),
        autostart: 1,
        camera: 0,
        ui_animations: 0,
        ui_infos: 0,
        ui_stop: 0,
        ui_inspector: 0,
        ui_watermark_link: 0,
        ui_watermark: 0,
        ui_ar: 0,
        ui_help: 0,
        ui_settings: 0,
        ui_fullscreen: 0,
        ui_annotations: 0,
        prevent_user_light_rotation: 1,
        ui_controls: 0
      });
    } else {
      console.error('Sketchfab API script not loaded');
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (apiClient) {
        apiClient.stop();
      }
    };
  }, [setPosition, setTarget]);

  const getNodeMap = (api: ApiClient) => {
    api.getNodeMap((err: any, nodes: any[]) => {
      if (!err) {
        console.log('Node map retrieved:', nodes);
        setNodes(nodes);
      } else {
        console.error('Failed to get node map:', err);
      }
    });
  };

  useEffect(() => {
    const blurTimeout = setTimeout(() => {
      setIsBlurred(false);
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 5));
    }, 500);

    return () => {
      clearTimeout(blurTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  const toggleUserInteraction = () => {
    if (apiClient) {
      const newState = !userInteractionEnabled;
      apiClient.setUserInteraction(newState, (err: any) => {
        if (!err) {
          console.log(`User interaction toggled to ${newState}`);
          setUserInteractionEnabled(newState);
        } else {
          console.error('Failed to toggle user interaction:', err);
        }
      });
    }
  };

  const handleViewChange = (position: { x: number; y: number; z: number }, target: { x: number; y: number; z: number }) => {
    if (apiClient) {
      apiClient.setCameraLookAt(position, target, (err: any) => {
        if (err) {
          console.error('Failed to set camera look at:', err);
        } else {
          console.log(`Camera set to position ${position}`);
        }
      });
    }
  };

  const showNode = (nodeID: number) => {
    if (apiClient) {
      apiClient.show(nodeID, (err: any) => {
        if (!err) {
          console.log(`Showed node ${nodeID}`);
          hideOtherNodes(nodeID);
        } else {
          console.error(`Failed to show node ${nodeID}:`, err);
        }
      });
    }
  };

  const hideNode = (nodeID: number) => {
    if (apiClient) {
      apiClient.hide(nodeID, (err: any) => {
        if (!err) {
          console.log(`Hid node ${nodeID}`);
        } else {
          console.error(`Failed to hide node ${nodeID}:`, err);
        }
      });
    }
  };

  const hideOtherNodes = (nodeID: number) => {
    const otherNodes = [3, 97, 182].filter((id) => id !== nodeID);
    otherNodes.forEach(hideNode);
  };

  const updateTextureAndMaterial = (
    textureType: keyof typeof ColorImages,
    color: keyof typeof ColorImages[keyof typeof ColorImages],
    materialId: string,
    setTexture: React.Dispatch<React.SetStateAction<string>>
  ) => {
    console.log(`Updating texture for ${textureType} with color ${color}`);
    if (apiClient) {
      const textureURL = ColorImages[textureType][color];
      if (!textureURL) {
        console.error(`Invalid texture URL for ${textureType} with color ${color}`);
        return;
      }

      const textureUid = {
        coulisse: coulisseTexture,
        tablier: tablierTexture,
        lameFinale: lameFinaleTexture,
      }[textureType] || ''; // Provide a default empty string if textureUid is undefined

      apiClient.updateTexture(textureURL, textureUid, (err: any, newTextureUid: string) => {
        if (err) {
          console.error('Failed to update texture:', err);
          return;
        }

        console.log('Replaced texture with UID', newTextureUid);
        apiClient.getMaterialList((err: any, materials: any[]) => {
          if (err) {
            console.error('Failed to get material list:', err);
            return;
          }

          const materialToUpdate = materials.find((material: any) => material.id === materialId);
          if (!materialToUpdate) {
            console.error(`Material with ID ${materialId} not found`);
            return;
          }

          if (!materialToUpdate.channels) {
            console.error(`Material with ID ${materialId} has no channels`);
            return;
          }

          if (materialToUpdate.channels.AlbedoPBR) {
            materialToUpdate.channels.AlbedoPBR.texture = materialToUpdate.channels.AlbedoPBR.texture || {};
            materialToUpdate.channels.AlbedoPBR.texture.uid = newTextureUid;
          } else {
            console.error(`AlbedoPBR channel not found for material with ID ${materialId}`);
          }

          if (materialToUpdate.channels.EmitColor) {
            materialToUpdate.channels.EmitColor.texture = materialToUpdate.channels.EmitColor.texture || {};
            materialToUpdate.channels.EmitColor.texture.uid = newTextureUid;
          } else {
            console.error(`EmitColor channel not found for material with ID ${materialId}`);
          }

          apiClient.setMaterial(materialToUpdate, (err: any) => {
            if (err) {
              console.error('Failed to update material:', err);
            } else {
              console.log('Material updated with new texture UID:', newTextureUid);
              setTexture(newTextureUid);
            }
          });
        });
      });
    }
  };

  useEffect(() => {
    if (apiClient) {
      if (installationType === 'En applique') {
        showNode(3);
      } else if (installationType === 'sous lanteau') {
        showNode(97);
      } else if (installationType === 'sous lanteau inverse') {
        showNode(182);
      }
    }
  }, [installationType, apiClient]);

  useEffect(() => {
    if (apiClient) {
      updateTextureAndMaterial('coulisse', coulisseColor as keyof typeof ColorImages[keyof typeof ColorImages], "620c9a9c-1699-4b2a-8d1d-1008b3508fcd", setCoulisseTexture);
    }
  }, [apiClient, coulisseColor]);

  useEffect(() => {
    if (apiClient) {
      updateTextureAndMaterial('tablier', tablierColor as keyof typeof ColorImages[keyof typeof ColorImages], "6e833e7a-b13b-4ea8-baa9-f583d58fc036", setTablierTexture);
    }
  }, [apiClient, tablierColor]);

  useEffect(() => {
    if (apiClient) {
      updateTextureAndMaterial('lameFinale', lameFinaleColor as keyof typeof ColorImages[keyof typeof ColorImages], "4d84e49f-98a3-4e75-b6d0-03829414ae80", setLameFinaleTexture);
    }
  }, [apiClient, lameFinaleColor]);

  const constrainCameraRotation = (rotation: [number, number, number], maxRotation: number): [number, number, number] => {
    const radToDeg = (rad: number) => rad * (180 / Math.PI);
    const degToRad = (deg: number) => deg * (Math.PI / 180);

    const yRotationDeg = radToDeg(rotation[1]);

    if (yRotationDeg > maxRotation) {
      rotation[1] = degToRad(maxRotation);
    } else if (yRotationDeg < -maxRotation) {
      rotation[1] = degToRad(-maxRotation);
    }

    return rotation;
  };

  useEffect(() => {
    if (apiClient) {
      const maxRotation = 90;
      apiClient.addEventListener('cameraChange', (camera: any) => {
        const constrainedRotation = constrainCameraRotation(camera.rotation, maxRotation);
        apiClient.setCamera({ rotation: constrainedRotation });
      });
    }
  }, [apiClient]);

  return (
    <div className="viewer-container">
      <iframe id="sketchfab-viewer" className={isBlurred ? 'blurred' : ''}></iframe>
      {isBlurred && (
        <div className="loading-Viewer">
          <img src={logo} alt="Loading..." />
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
      <div className="overlay-buttons">
        <button className="InteractionButton" onClick={() => handleViewChange({ x: -10.7206, y: 7.83963, z: 1.6895 }, { x: -4.6246, y: -0.74928, z: 1.57804 })}>
          Outside View
        </button>
        <button className="InteractionButton" onClick={() => handleViewChange({ x: -0.20124, y: -3.4002, z: 1.5615 }, { x: -5.12, y: 3.01, z: 1.56 })}>
          Inside View
        </button>
        <button className="InteractionButton" onClick={toggleUserInteraction}>
          {userInteractionEnabled ? 'Disable Interaction' : 'Enable Interaction'}
        </button>
      </div>
    </div>
  );
};

export default Viewer;
