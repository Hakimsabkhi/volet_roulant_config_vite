import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectInstallationType } from '../../features/voletSlice';
import OverlayButtons from './OverlayButtons';
import TextureUpdater from './TextureUpdater';
import APIDataFetcher from './APIDataFetcher';
import './Viewer.css';
import { ViewerProps } from "../../interfaces";

const Viewer: React.FC<ViewerProps> = ({ setPosition, setTarget }) => {
  const [apiClient, setApiClient] = useState<any | null>(null);
  const [userInteractionEnabled, setUserInteractionEnabled] = useState<boolean>(true);
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [coulisseTexture, setCoulisseTexture] = useState<string>("33b7f13018224606a347dc752a5bf9e5");
  const [tablierTexture, setTablierTexture] = useState<string>("cec33a451ee5427687bfb05f847cdf09");
  const [lameFinaleTexture, setLameFinaleTexture] = useState<string>("9a7c42640fa244fc828f6bb88c6b24ca");

  const installationType = useSelector(selectInstallationType);

  useEffect(() => {
    const iframe = document.getElementById('sketchfab-viewer') as HTMLIFrameElement;
    let intervalId: NodeJS.Timeout | null = null;

    const mediaQuery = window.matchMedia('(max-width: 1050px) and (min-height: 660px)');
    
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        apiClient && apiClient.setFov(70, (err: any) => {
          if (err) {
            console.error('Failed to set camera field of view:', err);
          } else {
            console.log('Camera field of view set to 70 degrees');
          }
        });
      } else {
        apiClient && apiClient.setFov(60, (err: any) => {
          if (err) {
            console.error('Failed to set camera field of view:', err);
          } else {
            console.log('Camera field of view set to 60 degrees');
          }
        });
      }
    };

    if (window.Sketchfab) {
      const client = new window.Sketchfab(iframe);
      client.init('231bc663e779447faddce738c2d66fde', {
        success: (api: any) => {
          api.start({ preload: 1 });
          api.addEventListener('viewerready', () => {
            console.log('Viewer is ready');
            setApiClient(api);

            // Set initial camera position and target with a delay of 2 seconds
            setTimeout(() => {
              const initialPosition: [number, number, number] = [2.6201731305279115, 1.7391765218021726, 2.246155724912089];
              const initialTarget: [number, number, number] = [2.754840408791274, -7.138095141931463, 2.246155724912089];
              api.setCameraLookAt(initialPosition, initialTarget, 6, (err: any) => {
                if (err) {
                  console.error('Failed to set initial camera position:', err);
                } else {
                  console.log('Initial camera position set');
                }
              });

              // Set the field of view based on the media query
              if (mediaQuery.matches) {
                api.setFov(80, (err: any) => {
                  if (err) {
                    console.error('Failed to set camera field of view:', err);
                  } else {
                    console.log('Camera field of view set to 70 degrees');
                  }
                });
              } else {
                api.setFov(45, (err: any) => {
                  if (err) {
                    console.error('Failed to set camera field of view:', err);
                  } else {
                    console.log('Camera field of view set to 60 degrees');
                  }
                });
              }
            }, 1000);

            mediaQuery.addEventListener('change', handleMediaQueryChange);

            api.setUserInteraction(userInteractionEnabled, (err: any) => {
              if (err) {
                console.error('Failed to set user interaction:', err);
              } else {
                console.log(`Initial user interaction set to ${userInteractionEnabled}`);
              }
            });

            const updateCameraDetails = () => {
              api.getCameraLookAt((err: any, cameraLookAt: any) => {
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
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [setPosition, setTarget]);

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

  const handleViewChange = (position: [number, number, number], target: [number, number, number], duration: number = 5, callback?: (err: any) => void) => {
    if (apiClient) {
      apiClient.setCameraLookAt(position, target, duration, (err: any) => {
        if (callback) callback(err);
        if (err) {
          console.error('Failed to set camera look at:', err);
        }
      });
    }
  };

  useEffect(() => {
    if (apiClient) {
      if (installationType === 'En applique') {
        apiClient.show(3, (err: any) => {
          if (!err) {
            apiClient.hide(97, (err: any) => {
              if (err) console.error('Failed to hide node 97:', err);
            });
            apiClient.hide(182, (err: any) => {
              if (err) console.error('Failed to hide node 182:', err);
            });
          } else {
            console.error('Failed to show node 3:', err);
          }
        });
      } else if (installationType === 'sous lanteau') {
        apiClient.show(97, (err: any) => {
          if (!err) {
            apiClient.hide(3, (err: any) => {
              if (err) console.error('Failed to hide node 3:', err);
            });
            apiClient.hide(182, (err: any) => {
              if (err) console.error('Failed to hide node 182:', err);
            });
          } else {
            console.error('Failed to show node 97:', err);
          }
        });
      } else if (installationType === 'sous lanteau inverse') {
        apiClient.show(182, (err: any) => {
          if (!err) {
            apiClient.hide(3, (err: any) => {
              if (err) console.error('Failed to hide node 3:', err);
            });
            apiClient.hide(97, (err: any) => {
              if (err) console.error('Failed to hide node 97:', err);
            });
          } else {
            console.error('Failed to show node 182:', err);
          }
        });
      }
    }
  }, [installationType, apiClient]);

  return (
    <div className="viewer-container">
      <iframe id="sketchfab-viewer" className={isBlurred ? 'blurred' : ''}></iframe>
      <OverlayButtons handleViewChange={handleViewChange} toggleUserInteraction={toggleUserInteraction} userInteractionEnabled={userInteractionEnabled} />
      <TextureUpdater apiClient={apiClient} textureType="coulisse" textureId="fd81e75a-b2e0-4810-a6b2-75ecc2642917" setTexture={setCoulisseTexture} />
      <TextureUpdater apiClient={apiClient} textureType="tablier" textureId="92eecb9c-a382-464a-8734-cb2cab58f5ee" setTexture={setTablierTexture} />
      <TextureUpdater apiClient={apiClient} textureType="lameFinale" textureId="c1b65b55-ff79-473e-b744-bd0403d80962" setTexture={setLameFinaleTexture} />
      <APIDataFetcher apiClient={apiClient} />
    </div>
  );
};

export default Viewer;
