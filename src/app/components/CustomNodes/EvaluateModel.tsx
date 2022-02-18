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

const EvaluateModel: FC<NodeProps> = ({ data, isConnectable }) => {
  return (
    <Node>
      <Port
        data={data}
        type="target"
        portType="dataset:1"
        position={Position.Top}
        isConnectable={isConnectable}
        isValidConnection={isSourceDataSet}
        style={leftHandle}
      />
      <Port
        data={data}
        type="target"
        position={Position.Top}
        portType="dataset:2"
        isConnectable={isConnectable}
        style={rightHandle}
        isValidConnection={isSourceDataSet}
      />
      <ColorBand style={{ backgroundColor: ColorByCategory.Evaluate }} />
      <div>Evaluate Model</div>
      <Port
        data={data}
        type="source"
        position={Position.Bottom}
        portType="trained"
        isConnectable={isConnectable}
        isValidConnection={isTargetDataSet}
      />
    </Node>
  );
};

export default memo(EvaluateModel);
