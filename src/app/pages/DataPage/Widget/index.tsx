import React, { DragEvent } from 'react';
import styled from 'styled-components';
import { ColorByCategory } from 'styles/colorByCategory';
import SelectPath from 'app/components/SelectPath';
import { useAppSelector } from 'app/hooks/useRedux';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Widget = () => {
  // 데그 실행중에 드래그 기능 정지
  const { dagStatusLoading } = useAppSelector(state => state.datapage);

  return (
    <Aside>
      <SelectPath />
      <Discription>data</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'data')}
        draggable={!dagStatusLoading}
        style={{ backgroundColor: ColorByCategory.Data }}
      >
        <Label>Data</Label>
      </NodeItem>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'splitData')}
        draggable={!dagStatusLoading}
        style={{ backgroundColor: ColorByCategory.Data }}
      >
        <Label>Split Data</Label>
      </NodeItem>

      <Discription>model</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) =>
          onDragStart(event, 'linearRegression')
        }
        draggable={!dagStatusLoading}
        style={{ backgroundColor: ColorByCategory.Model }}
      >
        <Label>Linear Regression</Label>
      </NodeItem>
      <NodeItem
        onDragStart={(event: DragEvent) =>
          onDragStart(event, 'logisticRegression')
        }
        draggable={!dagStatusLoading}
        style={{ backgroundColor: ColorByCategory.Model }}
      >
        <Label>Logistic Regression</Label>
      </NodeItem>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'trainModel')}
        draggable={!dagStatusLoading}
        style={{ backgroundColor: ColorByCategory.Model }}
      >
        <Label>Train Model</Label>
      </NodeItem>
      <Discription>score</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'scoreModel')}
        draggable={!dagStatusLoading}
        style={{ backgroundColor: ColorByCategory.Score }}
      >
        <Label>Score Model</Label>
      </NodeItem>
      <Discription>evaluate</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'evaluateModel')}
        draggable={!dagStatusLoading}
        style={{ backgroundColor: ColorByCategory.Evaluate }}
      >
        <Label>Evaluate Model</Label>
      </NodeItem>
    </Aside>
  );
};

export default Widget;

const Aside = styled.aside`
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 15px;
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 200px;
`;

const NodeItem = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  ${props => props.style?.backgroundColor}
`;

const Label = styled.label`
  user-select: none;
`;

const Discription = styled.div`
  user-select: none;
`;
