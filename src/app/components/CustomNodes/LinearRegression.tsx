import React, { memo, FC } from 'react';
import { Position, NodeProps } from 'react-flow-renderer';
import { Node, ColorBand } from 'app/components/CustomNodes/style';
import { isTargetUntrained } from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';
import Port from '../Port';

const LinearRegression: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <ColorBand style={{ backgroundColor: ColorByCategory.Model }} />
      <div>Linear Regression</div>
      <Port
        data={data}
        type="source"
        portType="untrained"
        position={Position.Bottom}
        isConnectable={isConnectable}
        isValidConnection={isTargetUntrained}
      />
    </Node>
  );
};

export default memo(LinearRegression);
