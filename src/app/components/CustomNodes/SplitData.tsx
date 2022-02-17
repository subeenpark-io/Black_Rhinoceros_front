import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import {
  Node,
  ColorBand,
  leftHandle,
  rightHandle,
} from 'app/components/CustomNodes/style';
import { isSourceDataSet, isTargetDataSet } from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';

const SplitData: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        id="dataset"
        isConnectable={isConnectable}
        isValidConnection={isSourceDataSet}
        className={
          data.target.find(ele => ele === 'dataset') ? 'connected' : ''
        }
      />
      <ColorBand style={{ backgroundColor: ColorByCategory.Data }} />
      <div>Split Data</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="dataset:1"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isTargetDataSet}
        className={
          data.source.find(ele => ele === 'dataset:1') ? 'connected' : ''
        }
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="dataset:2"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
        style={rightHandle}
        className={
          data.source.find(ele => ele === 'dataset:2') ? 'connected' : ''
        }
      />
    </Node>
  );
};

export default memo(SplitData);
