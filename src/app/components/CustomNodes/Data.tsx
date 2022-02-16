import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { Node } from 'app/components/CustomNodes/style';
import { isTargetDataSet } from './util/connectValitation';

const Data: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <div>Data</div>
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

export default memo(Data);
