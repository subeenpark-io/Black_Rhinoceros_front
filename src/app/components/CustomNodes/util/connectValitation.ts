import { Connection } from 'react-flow-renderer';

export const isTargetDataSet = (connection: Connection) => {
  const splited = connection.targetHandle?.split(':')[0];
  return splited === 'dataset';
};

export const isTargetUntrained = (connection: Connection) => {
  return connection.targetHandle === 'untrained';
};

export const isTargetTrained = (connection: Connection) => {
  return connection.targetHandle === 'trained';
};

export const isSourceDataSet = (connection: Connection) => {
  const splited = connection.sourceHandle?.split(':')[0];
  return splited === 'dataset';
};

export const isSourceTrained = (connection: Connection) => {
  return connection.sourceHandle === 'trained';
};

export const isSourceUntrained = (connection: Connection) => {
  return connection.sourceHandle === 'untrained';
};
