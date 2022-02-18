import React, { useState, DragEvent, useEffect, useCallback } from 'react';
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
  const [params, setParams] = useState<Edge | Connection | null>(null);

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements(els => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);

  const onConnect = useCallback(
    (params: Edge | Connection): Elements => {
      const nodes = elements.filter(ele => isNode(ele)) as Node[];
      const edges = elements.filter(ele => isEdge(ele)) as Edge[];

      // 연결하려고 하는 포트의 엣지가 존재하면 그 엣지 삭제
      const paramsSourceId = (params.source as string) + params.sourceHandle;
      const paramsTargetId = (params.target as string) + params.targetHandle;

      const removedEdges = edges.filter(edge => {
        if (edge.source + edge.sourceHandle === paramsSourceId) {
          return false;
        }
        if (edge.target + edge.targetHandle === paramsTargetId) {
          return false;
        }
        return true;
      });

      // 엣지는 params를 수청해서 커스텀한다.
      const customizedParams = {
        ...params,
        type: 'custom',
        arrowHeadType: ArrowHeadType.ArrowClosed,
      };
      return addEdge(customizedParams, [...nodes, ...removedEdges]);
    },
    [params],
  );

  useEffect(() => {
    const newElements = params ? onConnect(params) : elements;
    const nodes = newElements.filter(ele => isNode(ele)) as Node[];
    const edges = newElements.filter(ele => isEdge(ele)) as Edge[];

    // data의 scource, targe을 초기화 해서 모든 노드의 포트를 빈 포트로 만든다(색을 지운다).
    const resetNodes = nodes.map(node => {
      return { ...node, data: { ...node.data, source: [], target: [] } };
    });

    // 노드들과 엣지들을 모두 순회해서 포트들의 색을 다시 칠한다.
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

    setElements([...newNodes, ...edges]);
  }, [onConnect]);

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
            onConnect={connection => {
              setParams(connection);
            }}
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
