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
  ArrowHeadType,
} from 'react-flow-renderer';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import NodeTypes from 'app/components/CustomNodes/util/nodeTypes';
import edgeTypes from 'app/components/CustomEdge/util/EdgeTypes';

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

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements(els => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);

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
    // 일단 노드, 엣지가 추가되거나 삭제되면 실행하게끔 엘리먼츠 길이를 디펜던시로 잡았다.
    // 길이가 변하지 않는 엘리먼츠 변화가 있을 수 있다. (ex 엣지 업데이트)
    // 추후에 관련 기능이 추가되면 수정해야 할듯.
  }, [elements.length]);

  const onConnect = async (params: Edge | Connection) => {
    // 연결하려고 하는 포트의 엣지가 존제하면 그 엣지 삭제
    const edges = elements.filter(ele => isEdge(ele)) as Edge[];
    const paramsSourceId = (params.source as string) + params.sourceHandle;
    const paramsTargetId = (params.target as string) + params.targetHandle;

    // await 전구가 뜨지만 작동은 잘되는데,,,
    // 삭제를 하고, 추가하는 순서
    await edges.forEach(edge => {
      if (edge.source + edge.sourceHandle === paramsSourceId) {
        setElements(el => removeElements([edge], el));
      }
      if (edge.target + edge.targetHandle === paramsTargetId) {
        setElements(el => removeElements([edge], el));
      }
    });

    // 엣지는 params를 수청해서 커스텀한다.
    const customizedParams = {
      ...params,
      type: 'custom',
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
    setElements(els => addEdge(customizedParams, els));
  };
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
            edgeTypes={edgeTypes}
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
