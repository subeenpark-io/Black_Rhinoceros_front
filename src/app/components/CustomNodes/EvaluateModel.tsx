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

const EvaluateModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        id="dataset:1"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceDataSet}
        className={
          data.target.find(ele => ele === 'dataset:1') ? 'connected' : ''
        }
      />
      <Handle
        type="target"
        position={Position.Top}
        id="dataset:2"
        isConnectable={isConnectable}
        style={rightHandle}
        isValidConnection={isSourceDataSet}
        className={
          data.target.find(ele => ele === 'dataset:2') ? 'connected' : ''
        }
      />
      <ColorBand style={{ backgroundColor: ColorByCategory.Evaluate }} />
      <div>Evaluate Model</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="trained"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
        className={
          data.source.find(ele => ele === 'trained') ? 'connected' : ''
        }
      />
    </Node>
  );
};

export default memo(EvaluateModel);
