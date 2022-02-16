import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import {
  Node,
  leftHandle,
  rightHandle,
} from 'app/components/CustomNodes/style';
import {
  isSourceDataSet,
  isSourceTrained,
  isTargetDataSet,
} from './util/connectValitation';

const ScoreModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        id="trained"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceTrained}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="dataset"
        isConnectable={isConnectable}
        style={rightHandle}
        isValidConnection={isSourceDataSet}
      />
      <div>Score Model</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="dataset"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
      />
    </Node>
  );
};

export default memo(ScoreModel);
