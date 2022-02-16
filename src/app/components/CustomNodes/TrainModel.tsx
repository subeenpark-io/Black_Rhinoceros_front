import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import {
  Node,
  leftHandle,
  rightHandle,
} from 'app/components/CustomNodes/style';
import {
  isSourceUntrained,
  isSourceDataSet,
  isTargetTrained,
} from './util/connectValitation';

const TrainModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        id="untrained"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceUntrained}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="dataset"
        isConnectable={isConnectable}
        style={rightHandle}
        isValidConnection={isSourceDataSet}
      />
      <div>Train Model</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="trained"
        isConnectable={isConnectable}
        isValidConnection={isTargetTrained}
      />
    </Node>
  );
};

export default memo(TrainModel);
