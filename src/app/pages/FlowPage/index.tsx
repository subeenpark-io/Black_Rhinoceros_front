import React, { useState, DragEvent } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Edge,
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
import { portDarkening, portColoring, getId } from './uitl';

const initialElements = [];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const FlowPage = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);

  const onElementsRemove = (elementsToRemove: Elements) => {
    const removedElements = removeElements(elementsToRemove, elements);

    const portColoredElements = portDarkening(removedElements);
    setElements(portColoredElements);
  };

  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);

  const onConnect = (params: Edge | Connection) => {
    const nodes = elements.filter(ele => isNode(ele)) as Node[];
    const edges = elements.filter(ele => isEdge(ele)) as Edge[];

    // 출발하는 노드와 도착하는 노드가 같다면 취소
    if (params.source === params.target) return;

    // 연결하려고 하는 포트가 연결 되어 있는 포트라면 해당하는 엣지 삭제
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

    // 엣지는 params로 커스텀한다.
    const customizedParams = {
      ...params,
      type: 'custom',
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
    const edgeAddedElements = addEdge(customizedParams, [
      ...nodes,
      ...removedEdges,
    ]);

    const portColoredElements = portDarkening(edgeAddedElements);
    setElements(portColoredElements);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - 250,
        y: event.clientY - 20,
      });

      const nodeId = getId();
      const newNode: Node = {
        id: nodeId,
        type,
        position,
        data: {
          label: `${type} node`,
          source: [],
          target: [],
          nodeId,
        },
      };

      setElements(es => es.concat(newNode));
    }
  };

  const onConnectStart = (e: React.MouseEvent, { nodeId, handleType }) => {
    const target = e.target as HTMLElement;
    const startParams = {
      nodeId,
      handleType,
      portType: target.dataset.handleid as string,
    };

    const coloredElements = portColoring(elements, startParams);
    setElements(coloredElements);
  };

  const onConnectStop = () => {
    const deColoredElements = portDarkening(elements);
    setElements(deColoredElements);
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
            onConnectStart={onConnectStart}
            onConnectStop={onConnectStop}
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
