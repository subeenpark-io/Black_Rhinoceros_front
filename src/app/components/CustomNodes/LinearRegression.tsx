import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { Node } from 'app/components/CustomNodes/style';
import { isTargetUntrained } from './util/connectValitation';

const LinearRegression: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <div>Linear Regression</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="untrained"
        isConnectable={isConnectable}
        isValidConnection={isTargetUntrained}
      />
    </Node>
  );
};

export default memo(LinearRegression);
