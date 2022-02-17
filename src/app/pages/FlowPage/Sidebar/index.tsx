import React, { DragEvent } from 'react';
import styled from 'styled-components';
import { ColorByCategory } from 'styles/colorByCategory';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
  return (
    <Aside>
      <Discription>data</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'data')}
        draggable
        style={{ backgroundColor: ColorByCategory.Data }}
      >
        Data
      </NodeItem>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'splitData')}
        draggable
        style={{ backgroundColor: ColorByCategory.Data }}
      >
        Split Data
      </NodeItem>

      <Discription>model</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) =>
          onDragStart(event, 'linearRegression')
        }
        draggable
        style={{ backgroundColor: ColorByCategory.Model }}
      >
        Linear Regression
      </NodeItem>
      <NodeItem
        onDragStart={(event: DragEvent) =>
          onDragStart(event, 'logisticRegression')
        }
        draggable
        style={{ backgroundColor: ColorByCategory.Model }}
      >
        Logistic Regression
      </NodeItem>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'trainModel')}
        draggable
        style={{ backgroundColor: ColorByCategory.Model }}
      >
        Train Model
      </NodeItem>
      <Discription>score</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'scoreModel')}
        draggable
        style={{ backgroundColor: ColorByCategory.Score }}
      >
        Score Model
      </NodeItem>
      <Discription>evaluate</Discription>
      <NodeItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'evaluateModel')}
        draggable
        style={{ backgroundColor: ColorByCategory.Evaluate }}
      >
        Evaluate Model
      </NodeItem>
    </Aside>
  );
};

export default Sidebar;

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

const Discription = styled.div`
  user-select: none;
`;
