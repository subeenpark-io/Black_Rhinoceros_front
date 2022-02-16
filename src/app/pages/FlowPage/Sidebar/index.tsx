import React, { DragEvent } from 'react';
import styled from 'styled-components';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
  return (
    <Aside>
      <div className="description">data</div>
      <DataItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'data')}
        draggable
      >
        Data
      </DataItem>

      <div className="description">model</div>
      <ModelItem
        onDragStart={(event: DragEvent) =>
          onDragStart(event, 'linearRegression')
        }
        draggable
      >
        Linear Regression
      </ModelItem>
      <ModelItem
        onDragStart={(event: DragEvent) =>
          onDragStart(event, 'logisticRegression')
        }
        draggable
      >
        Logistic Regression
      </ModelItem>
      <ModelItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'trainModel')}
        draggable
      >
        Train Model
      </ModelItem>
      <div className="description">score</div>
      <ScoreItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'scoreModel')}
        draggable
      >
        Score Model
      </ScoreItem>
      <div className="description">evaluate</div>
      <EvaluateItem
        onDragStart={(event: DragEvent) => onDragStart(event, 'evaluateModel')}
        draggable
      >
        Evaluate Model
      </EvaluateItem>
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
`;

const DataItem = styled(NodeItem)`
  background-color: #c9cad0;
`;
const ModelItem = styled(NodeItem)`
  background-color: #e7efd2;
`;
const ScoreItem = styled(NodeItem)`
  background-color: #d2e7ef;
`;
const EvaluateItem = styled(NodeItem)`
  background-color: #e8d2ef;
`;
