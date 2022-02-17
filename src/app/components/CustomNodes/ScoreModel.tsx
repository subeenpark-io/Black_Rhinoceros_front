import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import {
  Node,
  ColorBand,
  leftHandle,
  rightHandle,
} from 'app/components/CustomNodes/style';
import {
  isSourceDataSet,
  isSourceTrained,
  isTargetDataSet,
} from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';

const ScoreModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        id="trained"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceTrained}
        className={
          data.target.find(ele => ele === 'trained') ? 'connected' : ''
        }
      />
      <Handle
        type="target"
        position={Position.Top}
        id="dataset"
        isConnectable={isConnectable}
        style={rightHandle}
        isValidConnection={isSourceDataSet}
        className={
          data.target.find(ele => ele === 'dataset') ? 'connected' : ''
        }
      />
      <ColorBand style={{ background: ColorByCategory.Score }} />
      <div>Score Model</div>
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

export default memo(ScoreModel);
