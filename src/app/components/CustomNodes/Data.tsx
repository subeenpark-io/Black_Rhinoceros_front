import React, { memo, FC } from 'react';
import { Position, NodeProps } from 'react-flow-renderer';
import { Node, ColorBand } from 'app/components/CustomNodes/style';
import { isTargetDataSet } from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';
import Port from '../Port';

const Data: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <ColorBand style={{ backgroundColor: ColorByCategory.Data }} />
      <div>Data</div>
      <Port
        type="source"
        portType="dataset"
        data={data}
        position={Position.Bottom}
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
      />
    </Node>
  );
};

export default memo(Data);
