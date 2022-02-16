import { Connection } from 'react-flow-renderer';

export const isTargetDataSet = (connection: Connection) => {
  return connection.targetHandle === 'dataset';
};

export const isTargetUntrained = (connection: Connection) => {
  return connection.targetHandle === 'untrained';
};

export const isTargetTrained = (connection: Connection) => {
  return connection.targetHandle === 'trained';
};

export const isSourceDataSet = (connection: Connection) => {
  return connection.sourceHandle === 'dataset';
};

export const isSourceTrained = (connection: Connection) => {
  return connection.sourceHandle === 'trained';
};

export const isSourceUntrained = (connection: Connection) => {
  return connection.sourceHandle === 'untrained';
};
