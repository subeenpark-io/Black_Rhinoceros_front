import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { Node, ColorBand } from 'app/components/CustomNodes/style';
import { isTargetDataSet } from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';

const Data: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <ColorBand style={{ backgroundColor: ColorByCategory.Data }} />
      <div>Data</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="dataset"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
        className={
          data.source.find(ele => ele === 'dataset') ? 'connected' : ''
        }
      />
    </Node>
  );
};

export default memo(Data);
