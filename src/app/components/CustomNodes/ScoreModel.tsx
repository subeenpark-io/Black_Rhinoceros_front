import React, { memo, FC } from 'react';
import { Position, NodeProps } from 'react-flow-renderer';
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
import Port from '../Port';

const ScoreModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Port
        data={data}
        type="target"
        position={Position.Top}
        portType="trained"
        isConnectable={isConnectable}
        style={leftHandle}
        isValidConnection={isSourceTrained}
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
      <ColorBand style={{ background: ColorByCategory.Score }} />
      <div>Score Model</div>
      <Port
        data={data}
        type="source"
        position={Position.Bottom}
        portType="dataset"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
      />
    </Node>
  );
};

export default memo(ScoreModel);
