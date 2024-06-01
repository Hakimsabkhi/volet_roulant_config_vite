import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectInstallationType } from '../../features/voletSlice';

interface NodeManagerProps {
  apiClient: any;
}

const NodeManager: React.FC<NodeManagerProps> = ({ apiClient }) => {
  const installationType = useSelector(selectInstallationType);

  useEffect(() => {
    if (!apiClient) return;

    const showNode = (nodeID: number) => {
      apiClient.show(nodeID, (err: any) => {
        if (!err) {
          const otherNodes = [3, 97, 182].filter((id) => id !== nodeID);
          otherNodes.forEach((node) => apiClient.hide(node));
        }
      });
    };

    if (installationType === 'En applique') {
      showNode(3);
    } else if (installationType === 'sous lanteau') {
      showNode(97);
    } else if (installationType === 'sous lanteau inverse') {
      showNode(182);
    }
  }, [apiClient, installationType]);

  return null;
};

export default NodeManager;
