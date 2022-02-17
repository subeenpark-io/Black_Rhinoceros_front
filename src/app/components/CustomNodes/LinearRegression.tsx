import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { Node, ColorBand } from 'app/components/CustomNodes/style';
import { isTargetUntrained } from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';

const LinearRegression: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <ColorBand style={{ backgroundColor: ColorByCategory.Model }} />
      <div>Linear Regression</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="untrained"
        isConnectable={isConnectable}
        isValidConnection={isTargetUntrained}
        className={
          data.source.find(ele => ele === 'untrained') ? 'connected' : ''
        }
      />
    </Node>
  );
};

export default memo(LinearRegression);
