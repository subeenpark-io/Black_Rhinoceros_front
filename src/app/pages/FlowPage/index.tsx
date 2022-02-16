import React, { useState, DragEvent } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  Node,
} from 'react-flow-renderer';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import NodeTypes from 'app/components/CustomNodes/util/nodeTypes';

const initialElements = [];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const FlowPage = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);

  const onConnect = (params: Connection | Edge) =>
    setElements(els => addEdge(params, els));
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements(els => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - 250,
        y: event.clientY - 20,
      });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setElements(es => es.concat(newNode));
    }
  };

  return (
    <Container>
      <ReactFlowProvider>
        <Sidebar />
        <Wrappper>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={NodeTypes}
            deleteKeyCode={46}
          >
            <Controls />
          </ReactFlow>
        </Wrappper>
      </ReactFlowProvider>
    </Container>
  );
};

export default FlowPage;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Wrappper = styled.div`
  height: 100%;
  width: 100%;
`;
