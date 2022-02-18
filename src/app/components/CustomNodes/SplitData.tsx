import React, { memo, FC } from 'react';
import { Position, NodeProps } from 'react-flow-renderer';
import {
  Node,
  ColorBand,
  leftHandle,
  rightHandle,
} from 'app/components/CustomNodes/style';
import { isSourceDataSet, isTargetDataSet } from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';
import Port from '../Port';

const SplitData: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Port
        data={data}
        type="target"
        position={Position.Top}
        portType="dataset"
        isConnectable={isConnectable}
        isValidConnection={isSourceDataSet}
      />
      <ColorBand style={{ backgroundColor: ColorByCategory.Data }} />
      <div>Split Data</div>
      <Port
        data={data}
        type="source"
        position={Position.Bottom}
        portType="dataset:1"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isTargetDataSet}
      />
      <Port
        data={data}
        type="source"
        position={Position.Bottom}
        portType="dataset:2"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
        style={rightHandle}
      />
    </Node>
  );
};

export default memo(SplitData);
