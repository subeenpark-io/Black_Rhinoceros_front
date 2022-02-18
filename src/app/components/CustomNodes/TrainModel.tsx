import React, { memo, FC } from 'react';
import { Position, NodeProps } from 'react-flow-renderer';
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
import Port from '../Port';

const TrainModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Port
        data={data}
        type="target"
        position={Position.Top}
        portType="untrained"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceUntrained}
      />
      <Port
        data={data}
        type="target"
        position={Position.Top}
        portType="dataset"
        isConnectable={isConnectable}
        style={rightHandle}
        isValidConnection={isSourceDataSet}
      />
      <ColorBand style={{ backgroundColor: ColorByCategory.Model }} />
      <div>Train Model</div>
      <Port
        data={data}
        type="source"
        position={Position.Bottom}
        portType="trained"
        isConnectable={isConnectable}
        isValidConnection={isTargetTrained}
      />
    </Node>
  );
};

export default memo(TrainModel);
