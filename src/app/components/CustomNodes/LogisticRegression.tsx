import React, { memo, FC } from 'react';
import { Position, NodeProps } from 'react-flow-renderer';
import { Node, ColorBand } from 'app/components/CustomNodes/style';
import { isTargetUntrained } from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';
import Port from '../Port';

const LogisticRegression: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <ColorBand style={{ backgroundColor: ColorByCategory.Model }} />
      <div>Logistic Regression</div>
      <Port
        data={data}
        type="source"
        position={Position.Bottom}
        portType="untrained"
        isConnectable={isConnectable}
        isValidConnection={isTargetUntrained}
      />
    </Node>
  );
};

export default memo(LogisticRegression);
