import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import {
  Node,
  leftHandle,
  rightHandle,
} from 'app/components/CustomNodes/style';
import { isSourceDataSet, isTargetDataSet } from './util/connectValitation';

const EvaluateModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        id="dataset"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceDataSet}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="dataset"
        isConnectable={isConnectable}
        style={rightHandle}
        isValidConnection={isSourceDataSet}
      />
      <div>Evaluate Model</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="trained"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
      />
    </Node>
  );
};

export default memo(EvaluateModel);
