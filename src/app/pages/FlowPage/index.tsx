import React, { useState, DragEvent, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Edge,
  ElementId,
  Node,
  Connection,
  isEdge,
  isNode,
  FlowElement,
  ArrowHeadType,
} from 'react-flow-renderer';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import NodeTypes from 'app/components/CustomNodes/util/nodeTypes';

const initialElements = [];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

// 노드 아이디 생성
let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const FlowPage = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);

  useEffect(() => {
    const nodes = elements.filter(el => isNode(el)) as Node[];
    const edges = elements.filter(el => isEdge(el)) as Edge[];

    const resetNodes = nodes.map(node => {
      return { ...node, data: { ...node.data, source: [], target: [] } };
    });

    const newNodes = resetNodes.map(node => {
      edges.forEach(edge => {
        if (node.id === edge.source) {
          node.data = {
            ...node.data,
            source: [...node.data.source, edge.sourceHandle],
          };
        } else if (node.id === edge.target) {
          node.data = {
            ...node.data,
            target: [...node.data.target, edge.targetHandle],
          };
        }
      });
      return node;
    });

    setElements(els => [...newNodes, ...edges]);

    // 일단 노드, 엣지가 추가되거나 삭제되면 실행하게끔 엘리먼츠 길이를 디펜던시로 잡음.
    // 길이가 변하지 않는 업데이트가 있을 수 있다. (ex 엣지 업데이트)
    // 추후에 관련 기능이 추가되면 수정해야 할듯.
  }, [elements.length]);

  const onConnect = (params: Edge | Connection) => {
    const paramsWithArrow = {
      ...params,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
    setElements(els => addEdge(paramsWithArrow, els));
  };
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
        data: { label: `${type} node`, source: [], target: [] },
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
