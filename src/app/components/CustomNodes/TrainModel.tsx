import React, { memo, FC } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import {
  Node,
  ColorBand,
  leftHandle,
  rightHandle,
} from 'app/components/CustomNodes/style';
import {
  isSourceUntrained,
  isSourceDataSet,
  isTargetTrained,
} from './util/connectValitation';
import { ColorByCategory } from 'styles/colorByCategory';

const TrainModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        id="untrained"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceUntrained}
        className={
          data.target.find(ele => ele === 'untrained') ? 'connected' : ''
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
      <ColorBand style={{ backgroundColor: ColorByCategory.Model }} />
      <div>Train Model</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="trained"
        isConnectable={isConnectable}
        isValidConnection={isTargetTrained}
        className={
          data.source.find(ele => ele === 'trained') ? 'connected' : ''
        }
      />
    </Node>
  );
};

export default memo(TrainModel);
